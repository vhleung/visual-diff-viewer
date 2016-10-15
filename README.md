# WCM Visual Diff Viewer

Within the authoring interface of IBM WCM, there is no easy way for the content authors and approvers to quickly determine what has been changed between two versions of a content item. Rather, content authors and approvers have to go through each element in the content item and do a manual comparison between the current version and a previous version of the content item. This can be rather laborious and frustrating, especially when dealing with content items with a large number of elements.

To address this issue, we have developed a “Visual Diff Viewer” that can be accessed from the standard IBM WCM Authoring Portlet. A new button labelled “Visual Diff” is accessible when the content item is opened up in Edit mode:
 
When the content author clicks on the “Visual Diff” button, the Visual Diff Viewer opens up in a new window, and lists all previous versions of the selected content item:
 
Once the content author has selected a previous version from the list, the Visual Diff Viewer iterates through every single element in the content item, and displays all elements whose values differ between the current version and a previous version of the content item:

## Installation

**IMPORTANT**: Before you do anything else, start by backup up the WCM Authoring Profile from the default Portal 8.5 theme:

  * This is the profile_wcmauthoring.json file, located in dav:fs-type1/themes/Portal8.5/profiles
  * The PAA file installation will overwrite the WCM Authoring Profile
    * The profile_wcmauthoring.json file is from Portal v8.5 CF05, so this might be problematic if this profile changes in later CFs.
    * If anything goes wrong, restore the back up profile_wcmauthoring.json file. Then, in the list of “moduleIDs”, you’ll need to manually add in a new module named “visual_diff_viewer”

Once you’ve backed up the profile, obtain the installation files:

  1. Download the VisualDiffViewer PAA from the Resources section
  2. Copy VisualDiffViewer.paa to /home/virtuser

To *install* the PAA, run the following two commands:

  1. /opt/IBM/WebSphere/Profiles/wp_profile/ConfigEngine/ConfigEngine.sh install-paa -DPAALocation=/home/virtuser/VisualDiffViewer.paa
  2. /opt/IBM/WebSphere/Profiles/wp_profile/ConfigEngine/ConfigEngine.sh deploy-paa -DappName=VisualDiffViewer

To *uninstall* the PAA, run the following two commands:

  1. /opt/IBM/WebSphere/Profiles/wp_profile/ConfigEngine/ConfigEngine.sh remove-paa -DappName=VisualDiffViewer -DforceRemove=true
  2. /opt/IBM/WebSphere/Profiles/wp_profile/ConfigEngine/ConfigEngine.sh uninstall-paa -DappName=VisualDiffViewer -DforceUninstall=true
 

