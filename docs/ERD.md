# Bayti — ERD

Entity relationship diagram (Chen notation). Rent is paid directly to the owner, so there
are no payment or commission entities; Bayti only earns from owner subscriptions.

![Bayti ERD](ERD-chen.svg)

- `USER` is specialized (ISA, by role) into `SEEKER`, `OWNER` and `ADMIN`.
- `PHOTO` is a weak entity: it only exists for a `PROPERTY`.
- `saves` links seekers and properties (M:N): a seeker's favorite homes.
- `takes part` links users and conversations (M:N): two users per conversation.
- Plans are fixed (Free · Featured · Agency), so they are an attribute of `SUBSCRIPTION`.
- Calculated, not stored: match score, full monthly cost (rent + bills + internet).
