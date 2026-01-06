
import { describe, expect, it } from "vitest";
import { Cl, cvToValue } from "@stacks/transactions";

const contractName = "trumDAO";
const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("trumDAO initialization", () => {
  it("exposes contract metadata and default state", () => {
    const { result: info } = simnet.callReadOnlyFn(contractName, "get-contract-info", [], deployer);
    expect(info).toBeTuple({
      name: Cl.stringAscii("TrumDAO"),
      version: Cl.stringAscii("1.2.0"),
    });

    const { result: emergency } = simnet.callReadOnlyFn(
      contractName,
      "get-emergency-state",
      [],
      deployer,
    );
    expect(emergency).toBeBool(false);

    expect(simnet.getDataVar(contractName, "proposal-counter")).toBeUint(0);
    expect(simnet.getDataVar(contractName, "treasury-proposal-counter")).toBeUint(0);
    expect(simnet.getDataVar(contractName, "reward-pool-counter")).toBeUint(0);
    expect(simnet.getDataVar(contractName, "action-counter")).toBeUint(5);

    const { result: standardType } = simnet.callReadOnlyFn(
      contractName,
      "get-proposal-type",
      [Cl.stringUtf8("standard")],
      deployer,
    );
    expect(standardType).toBeSome(
      Cl.tuple({
        "min-stake-required": Cl.uint(100000),
        "voting-period": Cl.uint(1440),
        "execution-delay": Cl.uint(144),
        "quadratic-enabled": Cl.bool(false),
        "time-weighted-enabled": Cl.bool(false),
      }),
    );
  });

  it("returns minimum time weight when no history exists", () => {
    const { result: timeWeight } = simnet.callReadOnlyFn(
      contractName,
      "get-time-weight",
      [Cl.standardPrincipal(wallet1)],
      wallet1,
    );
    expect(timeWeight).toBeUint(100);

    const { result: weightedPower } = simnet.callReadOnlyFn(
      contractName,
      "calculate-user-time-weighted-power",
      [Cl.standardPrincipal(wallet1)],
      wallet1,
    );
    expect(weightedPower).toBeNone();
  });
});

describe("admin and proposal type management", () => {
  it("restricts admin creation to the contract owner", () => {
    const { result: nonOwner } = simnet.callPublicFn(
      contractName,
      "add-admin",
      [Cl.standardPrincipal(wallet1)],
      wallet1,
    );
    expect(nonOwner).toBeErr(Cl.uint(100));

    const { result: ownerAddsAdmin } = simnet.callPublicFn(
      contractName,
      "add-admin",
      [Cl.standardPrincipal(wallet1)],
      deployer,
    );
    expect(ownerAddsAdmin).toBeOk(Cl.bool(true));

    const adminEntry = simnet.getMapEntry(contractName, "admins", Cl.standardPrincipal(wallet1));
    expect(adminEntry).toBeSome(Cl.bool(true));
  });

  it("requires admins to add proposal types", () => {
    const { result: notAdmin } = simnet.callPublicFn(
      contractName,
      "add-proposal-type",
      [
        Cl.stringUtf8("custom"),
        Cl.uint(100000),
        Cl.uint(1440),
        Cl.uint(144),
        Cl.bool(false),
        Cl.bool(false),
      ],
      wallet2,
    );
    expect(notAdmin).toBeErr(Cl.uint(100));

    simnet.callPublicFn(contractName, "add-admin", [Cl.standardPrincipal(wallet1)], deployer);
    const { result: added } = simnet.callPublicFn(
      contractName,
      "add-proposal-type",
      [
        Cl.stringUtf8("custom"),
        Cl.uint(100000),
        Cl.uint(1440),
        Cl.uint(144),
        Cl.bool(true),
        Cl.bool(true),
      ],
      wallet1,
    );
    expect(added).toBeOk(Cl.bool(true));

    const { result: customType } = simnet.callReadOnlyFn(
      contractName,
      "get-proposal-type",
      [Cl.stringUtf8("custom")],
      wallet1,
    );
    expect(customType).toBeSome(
      Cl.tuple({
        "min-stake-required": Cl.uint(100000),
        "voting-period": Cl.uint(1440),
        "execution-delay": Cl.uint(144),
        "quadratic-enabled": Cl.bool(true),
        "time-weighted-enabled": Cl.bool(true),
      }),
    );
  });
});

describe("execution actions and queue", () => {
  it("adds execution actions and exposes them via read-only", () => {
    const actionCounter = simnet.getDataVar(contractName, "action-counter");
    const nextId = (cvToValue(actionCounter) as bigint) + 1n;

    const { result } = simnet.callPublicFn(
      contractName,
      "add-execution-action",
      [
        Cl.stringUtf8("custom-action"),
        Cl.none(),
        Cl.stringUtf8("do-custom"),
        Cl.list([Cl.stringUtf8("uint")]),
        Cl.bool(true),
      ],
      deployer,
    );
    expect(result).toBeOk(Cl.uint(nextId));

    const { result: actionEntry } = simnet.callReadOnlyFn(
      contractName,
      "get-execution-action",
      [Cl.uint(nextId)],
      deployer,
    );
    expect(actionEntry).toBeSome(
      Cl.tuple({
        "action-type": Cl.stringUtf8("custom-action"),
        "target-contract": Cl.none(),
        "function-name": Cl.stringUtf8("do-custom"),
        "parameter-types": Cl.list([Cl.stringUtf8("uint")]),
        "requires-admin": Cl.bool(true),
        enabled: Cl.bool(true),
      }),
    );
  });

  it("queues proposals for execution with an admin", () => {
    simnet.callPublicFn(contractName, "add-admin", [Cl.standardPrincipal(wallet1)], deployer);

    const { result: queued } = simnet.callPublicFn(
      contractName,
      "queue-for-execution",
      [Cl.uint(1), Cl.uint(10), Cl.stringUtf8("auto")],
      wallet1,
    );
    expect(queued).toBeOk(Cl.stringAscii("Queued for execution"));

    const { result: queueItem } = simnet.callReadOnlyFn(
      contractName,
      "get-execution-queue-item",
      [Cl.uint(1)],
      wallet1,
    );
    expect(queueItem).toBeSome(expect.anything());

    const queueTuple = (queueItem as any).value as unknown;
    expect(queueTuple).toBeTuple({
      "proposal-id": Cl.uint(1),
      "execution-block": expect.anything(),
      executed: Cl.bool(false),
      "execution-type": Cl.stringUtf8("auto"),
    });
  });
});

describe("delegation", () => {
  it("blocks self-delegation and allows normal delegation", () => {
    const { result: selfDelegate } = simnet.callPublicFn(
      contractName,
      "delegate-to",
      [Cl.standardPrincipal(wallet1)],
      wallet1,
    );
    expect(selfDelegate).toBeErr(Cl.uint(122));

    const { result: delegated } = simnet.callPublicFn(
      contractName,
      "delegate-to",
      [Cl.standardPrincipal(wallet2)],
      wallet1,
    );
    expect(delegated).toBeOk(Cl.bool(true));
  });
});
