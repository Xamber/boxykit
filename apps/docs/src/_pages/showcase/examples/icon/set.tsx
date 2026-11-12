import { Archive, Bell, Calendar, Check, Clock, Download, Folder, Inbox, Search, Settings, Trash2, User } from "lucide-react";

// Any line-icon set works; these are Lucide (lucide-react), each with className="boxy-icon".
export function IconSet() {
  return (
    <div className="docs-row">
      <Inbox className="boxy-icon boxy-icon-large" />
      <Folder className="boxy-icon boxy-icon-large" />
      <Archive className="boxy-icon boxy-icon-large" />
      <Calendar className="boxy-icon boxy-icon-large" />
      <Clock className="boxy-icon boxy-icon-large" />
      <Bell className="boxy-icon boxy-icon-large" />
      <Search className="boxy-icon boxy-icon-large" />
      <Download className="boxy-icon boxy-icon-large" />
      <Check className="boxy-icon boxy-icon-large" />
      <Trash2 className="boxy-icon boxy-icon-large" />
      <User className="boxy-icon boxy-icon-large" />
      <Settings className="boxy-icon boxy-icon-large" />
    </div>
  );
}
