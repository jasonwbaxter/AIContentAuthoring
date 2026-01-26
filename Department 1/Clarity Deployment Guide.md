# Setup Guide for Deploying Microsoft Clarity to a SharePoint Site Collection

## Prerequisites

1. **Microsoft Clarity Account**: Create an account at [Microsoft Clarity](https://clarity.microsoft.com/) and set up a new project.
2. **SharePoint Permissions**: Ensure you have the necessary permissions to upload apps to the SharePoint App Catalog.

---

## Step 1: Create a Microsoft Clarity Project

1. **Sign In**: Go to the Microsoft Clarity website and sign in using your Microsoft, Google, or Facebook account.

2. **Add New Project**:
    - Click on **Add new project**.
    - Fill in the project details:
        - **Name**: Use your SharePoint site name.
        - **Website**: Enter the URL of your SharePoint site.
        - **Category**: Select an appropriate category.
    - *Note*: Clarity should not be used on sites with sensitive data.

3. **Get the Tracking Code**:
    - After creating the project, navigate to **Settings > Setup**.
    - Copy the unique identifier (tracking code) provided.

---

## Step 2: Prepare the Clarity Solution

1. **Download the Solution**: Obtain the Microsoft Clarity SharePoint solution package (sppkg file) from the [GitHub repository](https://github.com/).
2. Run `npm install`.
3. Navigate to your solution folder using the command line.
4. Run the command `npm install` to install all the necessary dependencies.
5. **Build the Solution**:
    - After installing the dependencies, run the command `gulp build` to build the solution.
6. **Ship the Solution**:
    - To package the solution for deployment, run the command `gulp bundle --ship`.
    - Finally, create the solution package by running `gulp package-solution --ship`.
7. **Upload to App Catalog**:
    - Go to your SharePoint Tenant App Catalog.
    - Click on **Apps for SharePoint**.
    - Upload the sppkg file.
    - Ensure to check **Make this solution available to all sites in the organization** if you want it globally available.

---

## Step 3: Configure the Clarity Solution

### Edit the Component Properties

After deployment, go to **Site Contents** and find the **Tenant Wide Extensions** list.

Locate the Microsoft Clarity item and edit it.

Add your unique Clarity ID in the Component Properties field:

```json
{"clarityID":"yourOwnId"}
```

- Save the changes.

---

## Step 4: Deploy to a Specific Site Collection (Optional)

If you prefer to deploy Clarity to a specific site collection:

1. **Create a Site Collection App Catalog** (if not already created).
2. **Upload the sppkg File**:
    - Navigate to the site collection's **Site Contents**.
    - Click on **Apps for SharePoint** and upload the sppkg file.
    - Deploy it without checking the global availability option.
3. **Use PnP PowerShell**:
    - Open PowerShell and connect to your SharePoint site:
      ```powershell
      Connect-PnPOnline -UseWebLogin -Url https://yourtenant.sharepoint.com/
      ```
    - Enable the solution with your Clarity project ID:
      ```powershell
      Add-PnPCustomAction -ClientSideComponentId "7f8fd1f2-9d2c-4a4a-a607-bf4622d7ec11" -Name "Microsoft Clarity" -Title "Microsoft Clarity" -Location ClientSideExtension.ApplicationCustomizer -ClientSideComponentProperties '{"clarityID":"yourOwnId"}' -Scope site
      ```

---

## Step 5: Adding Clarity to All SharePoint Sites

- **Access the SharePoint App Store**: Search for the Microsoft Clarity app.
- **Add the App**: Select the app and choose to enable it for all sites. This requires approval from a SharePoint admin if you are not one.
- **Configure the App**: Navigate to the Tenant-wide extensions in the App Catalog and paste your Clarity Project ID into the component properties.

---

## Step 6: Monitor User Interaction

- After deployment, it may take up to **2 hours** for data to start appearing in your Microsoft Clarity dashboard.
- You can access session recordings and heat maps to analyze user interactions on your SharePoint site.

---

## Important Considerations

- Ensure that the site does not contain sensitive information, as Clarity recordings may reveal confidential data.
- Regularly review the data collected to improve user experience.

---

This guide should help you effectively deploy Microsoft Clarity to your SharePoint site collection.  
If you have any questions or need further assistance, feel free to ask!

---

## References

- [SharePoint Integration with Clarity | Microsoft Learn](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/integrate-clarity)
- [sp-dev-fx-extensions/samples/js-application-microsoft-clarity at main · pnp/sp-dev-fx-extensions · GitHub](https://github.com/pnp/sp-dev-fx-extensions/tree/main/samples/js-application-microsoft-clarity)
- [How to add Microsoft Clarity to modern SharePoint - HANDS ON SharePoint](https://handsonsharepoint.com/how-to-add-microsoft-clarity-to-modern-sharepoint/)