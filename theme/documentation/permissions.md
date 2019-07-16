# Permissions

Front end permissions are determined by the user tags on the Zendesk `HelpCenter` object.

## KB Tag
- A limited support user, an employee, a customer, a partner, or a watcher, will have the **KB** tag.
- The **KB** tag will allow users access to view Knowledge Base Articles, Official Documentation, product landing pages, the mega menu, announcements, quick links on the homepage, and CTAs (calls to actions).
- Trial users will not have the **KB** tag.
- Users with the **KB** tag are not allowed to create or view tickets.
- The **KB** tag is reflected as a tag on the user's organization; it follows the format of `osb_kb`.

## Customer/Partner Tag
- Users with either the **Customer** or **Partner** role, have permissions to create tickets. They can view and create tickets for the organization in which they are a customer or partner. (For more details, see the *[new request page documentation](./new_request_page.md)*)
- Either, the **Customer** or **Partner** tag, will allow users access to Official Documentation.
- Either, the **Customer** or **Partner** tag, will allow users access to Developer Services if the service is available to the Organization they belong to.
- The **Customer** or **Partner** role will be reflected as a tag on the user's organization; it follows the format of `osb_customer` or `osb_partner`.

## Watcher Tag
- A user can be a **Watcher** for an organization without being a **Customer** or a **Partner**.
- Users with the **Watcher** role belong to a particular organization, but are not allowed to create tickets for that organization.
- The **Watcher** role is reflected as a tag on the user's organization; it follows the format of `osb_${orgID}_watcher`.