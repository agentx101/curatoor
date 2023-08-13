import { Signer } from 'ethers';
import { useAttest, encodeAttestationData } from 'react-eas';

const schemaUID = "0x5cfe1e236999c4c2971b52c18aef90119489f0e22dde7be493d8957d36c0b2d4";

type AttestationData = {
  eventId: number;
  voteIndex: number;
};

function OnchainAttestComponent() {
  const { onchain } = useAttest();

  async function handleIssueAttestation(data: AttestationData) {
    const encodedData = encodeAttestationData(data, [
      { name: "eventId", type: "uint256" },
      { name: "voteIndex", type: "uint8" },
    ]);

    const attestation = await onchain(schemaUID, {
      recipient: TBAaddress,
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    });

    return attestation;
  }

  return (
    <button onClick={() => handleIssueAttestation({ eventId: 273, voteIndex: 1 })}>
      Issue attestation
    </button>
  );
}