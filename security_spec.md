# Security Specification for Aetherial AI

## 1. Data Invariants
- A `User` profile must be created by the user themselves and have a strictly matching UID.
- A `Prompt` must have a valid `authorId` matching the creator's UID.
- `likesCount` on a `Prompt` should ideally be managed via secure decrement/increment, but in Firestore we must be careful. We will allow users to increment/decrement it only when adding/removing a `Like` document (though cross-document atomicity is hard to enforce perfectly without server logic, we'll use `existsAfter` where possible or just strict schema).
- A `Like` or `SavedPrompt` document ID must follow the pattern `userId_promptId` to ensure uniqueness per user/prompt pair.

## 2. The "Dirty Dozen" Payloads
1. Create a User with a different UID.
2. Update someone else's User profile.
3. Create a Prompt with someone else's `authorId`.
4. Delete a Prompt created by another user.
5. Increment `likesCount` by 100 in one update.
6. Create a `Like` for another user's ID.
7. Inject a 1MB string into the `User.username` field.
8. Update `User.createdAt` after initialization.
9. Query `users` collection without a specific UID filter (blanket read).
10. Create a `SavedPrompt` pointing to a non-existent prompt.
11. Update a Prompt's `authorId`.
12. Create a Collection for another user.

## 3. The Test Runner Plan
We will implement `firestore.rules` and verify them manually against these principles.
