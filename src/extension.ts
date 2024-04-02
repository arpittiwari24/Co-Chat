
import * as vscode from 'vscode';
import path from 'path';
import { SidebarProvider } from './sidebar-provider';

interface WebviewMessage {
  command: string;
  text?: string;
}

export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "webview",
      sidebarProvider
    )
  );

  const terminal = vscode.window.createTerminal('Git');

  // Register a command to execute the Git command
  const disposable = vscode.commands.registerCommand(
    'extension.executeGitCommand',
    (command: string) => {
      terminal.show(true); // Show the terminal
      terminal.sendText(command); // Send the Git command to the terminal
    }
  );

  context.subscriptions.push(disposable);

  
  
  }
  
  

// This method is called when your extension is deactivated
export function deactivate() {}
