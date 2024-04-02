
import * as vscode from 'vscode';
import path from 'path';
import { SidebarProvider } from './sidebar-provider';


export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "webview",
      sidebarProvider
    )
  );
  
  }
  
  

// This method is called when your extension is deactivated
export function deactivate() {}
