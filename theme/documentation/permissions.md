# Permissions

Front end permissions are determined by the user tags on the Zendesk `HelpCenter` object.

## KB Tag
- A limited support user, an employee, a customer, a partner, or a watcher will have the KB tag.
- The KB tag will allow access to view Knowledge Base Articles, Official Documentation, product landing pages, the mega menu, announcements, and CTAs (calls to actions) through this tag.
- Trial users will not have the KB tag.
- This role does not allow the user to create or view tickets.
- It is reflected as tag on the user's organization. It follows the format of `osb_kb`.

## Customer/Partner Tag
- Users with either the **Customer** or **Partner** role have permissions to create tickets. They can view and create tickets for the organization in which they are a customer or partner of. (For more details, see the *[new request page documentation](./new_request_page.md)*)
- Either of these two tags will allow user access to Official Documentation.
- The  **Customer** or **Partner** role will be reflected as a tag on the user's organization. It follows the format of `osb_customer` or `osb_partner`.

## Watcher Tag
- A user can be a **Watcher** for an organization without being a **Customer** or a **Partner**.
- In this role, the user belongs to a particular organization but cannot create tickets for that organization.
- This role is reflected as a tag on the user's organization. It follows the format of `osb_${orgID}_watcher`.