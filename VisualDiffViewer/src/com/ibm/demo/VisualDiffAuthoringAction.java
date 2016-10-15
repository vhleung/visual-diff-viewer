package com.ibm.demo;


import java.util.Locale;

import com.ibm.portal.ListModel;
import com.ibm.workplace.wcm.api.ContentComponentContainer;
import com.ibm.workplace.wcm.api.Document;
import com.ibm.workplace.wcm.api.extensions.authoring.ActionResult;
import com.ibm.workplace.wcm.api.extensions.authoring.AuthoringAction;
import com.ibm.workplace.wcm.api.extensions.authoring.FormContext;

public class VisualDiffAuthoringAction implements AuthoringAction {

	@Override
	public String getDescription(Locale locale) {
		return "Visual Diff";
	}

	@Override
	public ListModel<Locale> getLocales() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getTitle(Locale locale) {
		return "Visual Diff";
	}

	@Override
	public ActionResult execute(FormContext formContext) {
		Document document = formContext.document();
		
		System.out.println("VisualDiffAuthoringAction button clicked for " + document.getId());
		
		return null;
	}

	@Override
	public boolean isValidForForm(FormContext formContext) {
		Document document = formContext.document();
		if (document instanceof ContentComponentContainer && !formContext.isFormReadOnly()) {
			return true;
		}
		
		return false;
	}

	@Override
	public int ordinal() {
		return 0;
	}

}
