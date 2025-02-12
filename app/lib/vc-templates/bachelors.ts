
export const bachelorsVC = {
    "verifiableCredential": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json",
            "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        "id": "urn:uuid:2fe53dc9-b2ec-4939-9b2c-0d00f6663b6c",
        "type": [
            "VerifiableCredential",
            "OpenBadgeCredential"
        ],
        "name": "DCC Test Credential",
        "issuer": {
            "type": [
                "Profile"
            ],
            "id": "did:key:z6MknNQD1WHLGGraFi6zcbGevuAgkVfdyCdtZnQTGWVVvR5Q",
            "name": "Digital Credentials Consortium Test Issuer",
            "url": "https://dcconsortium.org",
            "image": "https://user-images.githubusercontent.com/752326/230469660-8f80d264-eccf-4edd-8e50-ea634d407778.png"
        },
        "issuanceDate": "2023-08-02T17:43:32.903Z",
        "credentialSubject": {
            "type": [
                "AchievementSubject"
            ],
            "achievement": {
                "id": "urn:uuid:bd6d9316-f7ae-4073-a1e5-2f7f5bd22922",
                "type": [
                    "Achievement"
                ],
                "achievementType": "Diploma",
                "name": "Degree",
                "description": "This is a sample degree issued by the Digital Credentials Consortium to demonstrate the functionality of Verifiable Credentials for wallets and verifiers.",
                "criteria": {
                    "type": "Criteria",
                    "narrative": "This degree wasn't issued to anyone, it is just a demo."
                },
                "image": {
                    "id": "https://user-images.githubusercontent.com/752326/214947713-15826a3a-b5ac-4fba-8d4a-884b60cb7157.png",
                    "type": "Image"
                }
            },
            "name": "Taylor Tunafish"
        }
    }
}

