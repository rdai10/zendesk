# Permissions

Front end permissions are determined by the user tags on the Zendesk `HelpCenter` object.

## KB Tag

-   A limited support user, an employee, a customer, a partner, or a watcher, will have the **KB** tag.
-   The **KB** tag will allow users access to view Knowledge Base Articles, Official Documentation, product landing pages, the mega menu, announcements, quick links on the homepage, and CTAs (calls to actions).
-   Trial users will not have the **KB** tag.
-   Users with the **KB** tag are not allowed to create or view tickets.
-   The **KB** tag is reflected as a tag on the user's organization; it follows the format of `osb_kb`.

## Customer/Partner Tag

-   Users with either the **Customer** or **Partner** role, have permissions to create tickets. They can view and create tickets for the organization in which they are a customer or partner. (For more details, see the _[new request page documentation](./new_request_page.md)_)
-   Either, the **Customer** or **Partner** tag, will allow users access to Official Documentation and Developer Services.
    -   Developer Services is a product that is only available if it is enabled for the user's Organization.
    -   To enable Developer Services, an administrator needs to add the `developer_services` tag on the Organization and add the Organization to the user segment.
-   The **Customer** or **Partner** role will be reflected as a tag on the user's organization; it follows the format of `osb_customer` or `osb_partner`.

## Watcher Tag

-   A user can be a **Watcher** for an organization without being a **Customer** or a **Partner**.
-   Users with the **Watcher** role belong to a particular organization, but are not allowed to create tickets for that organization.
-   The **Watcher** role is reflected as a tag on the user's organization; it follows the format of `osb_${orgID}_watcher`.
