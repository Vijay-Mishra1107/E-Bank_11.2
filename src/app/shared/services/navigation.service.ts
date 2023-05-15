import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IMenuItem {
  type: string; // Possible values: link/dropDown/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  constructor() { }
  iconMenu: IMenuItem[] = [
    {
      name: "Dashboard",
      type: "link",
      tooltip: "Dashboard",
      icon: "account_balance",
      state: "client-analytics/client-dashboard-WiproBank"
    },
    {
      name: "Client",
      type: "dropDown",
      icon: "how_to_reg",
      sub: [
        { name: "Transaction History", state: "client-analytics/client-analytics-WiproBank" },
        { name: "Loan Details", state: "client-analytics/all-loan_EMI" },
      ]
    },
    // {
    //   name: "Upgrade to PRO",
    //   type: "extLink",
    //   icon: "present_to_all",
    //   state: "http://WiproBank-angular.ui-lib.com"
    // }
  ];

  AdminIconMenu: IMenuItem[] = [
    {
      name: "Dashboard",
      type: "link",
      tooltip: "Dashboard",
      icon: "account_balance",
      state: "analyticsWiproBank/account-manager"
    },
    {
      name: "Accounts",
      type: "dropDown",
      tooltip: "All Camp's",
      icon: "how_to_reg",
      sub: [
        { name: "All Accounts", state: "analyticsWiproBank/analytics-WiproBank" },
      ]
    },
    {
      name: "Add New Account User",
      type: "link",
      icon: "group_add",
      state: "analyticsWiproBank/add-new-client"
    },
    {
      name: "Loans List",
      type: "link",
      icon: "real_estate_agent",
      state: "analyticsWiproBank/allLoans-WiproBank"
    },
  ]

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "Frequently Accessed";
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  menuItemsAdmin = new BehaviorSubject<IMenuItem[]>(this.AdminIconMenu);
  // navigation component has subscribed to this Observable
  menuItemsAdmin$ = this.menuItemsAdmin.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.iconMenu);
    this.menuItemsAdmin.next(this.AdminIconMenu);
  }
}
