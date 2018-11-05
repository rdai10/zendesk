# Permissions

Front end permissioning are determined by the user tags on the Zendesk `HelpCenter` object.

## KB Tag
- A limited support user has access to view Knowledge Base Articles, Official Documentations, and the mega menu.
- This role does not allow the user to create or view tickets.
- It is reflected as tag on the user's organization. It follows the format of `osb_kb`.

## Customer/Partner Tag
- Users with either the **Customer** or **Partner** role have create ticket permissions. They can view and create tickets for the organization in which they are a customer or partner to. (For more details, see the *[new request page documentation](./new_request_page.md)*)
- They can access Official Documentation, mega menu, announcements, and CTAs.
- The  **Customer** or **Partner** role will be reflected as a tag on the user's organization. It follows the format of `osb_customer` or `osb_partner`.

## Watcher Tag
- A user can be a **Watcher** for an organization without being a **Customer** or a **Partner**.
- In this role, the user belongs to a particular organization but cannot create tickets for that organization.
- This role is reflected as a tag on the user's organization. It follows the format of `osb_${orgID}_watcher`.