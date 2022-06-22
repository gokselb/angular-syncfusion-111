/**
 * Rich Text Editor Paste Cleanup functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';
import {
  RichTextEditorComponent,
  ToolbarService,
  PasteCleanupSettingsModel,
  LinkService,
  ImageService,
} from '@syncfusion/ej2-angular-richtexteditor';
import { PasteCleanupService } from '@syncfusion/ej2-angular-richtexteditor';
import {
  HtmlEditorService,
  CountService,
  QuickToolbarService,
} from '@syncfusion/ej2-angular-richtexteditor';
import {
  Link,
  Count,
  HtmlEditor,
  QuickToolbar,
} from '@syncfusion/ej2-angular-richtexteditor';
import { TextBox } from '@syncfusion/ej2-inputs';
import {
  DropDownListComponent,
  FieldSettingsModel,
} from '@syncfusion/ej2-angular-dropdowns';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    CountService,
    QuickToolbarService,
    PasteCleanupService,
  ],
})
export class AppComponent {
  @ViewChild('pasteCleanupRTE')
  public rteObj: RichTextEditorComponent;

  @ViewChild('formatOption')
  public formatObj: DropDownListComponent;

  @ViewChild('prompt')
  public promptObj: RadioButtonComponent;

  @ViewChild('plainText')
  public plainTextObj: RadioButtonComponent;

  @ViewChild('keepFormat')
  public keepFormatObj: RadioButtonComponent;

  @ViewChild('cleanFormat')
  public cleanFormatObj: RadioButtonComponent;

  @ViewChild('deniedTags')
  public deniedTags: TextBox;

  @ViewChild('deniedAttributes')
  public deniedAttributes: TextBox;

  @ViewChild('allowedStyleProperties')
  public allowedStyleProperties: TextBox;

  public pasteCleanupSettings: PasteCleanupSettingsModel = {
    prompt: true,
    plainText: false,
    keepFormat: false,
  };

  public formatData: { [key: string]: Object }[] = [
    { Id: 'prompt', Format: 'Prompt' },
    { Id: 'plainTextFormatting', Format: 'Plain Text' },
    { Id: 'keepFormating', Format: 'Keep Format' },
    { Id: 'Clean Formatting', Format: 'Clean Format' },
  ];
  public fields: FieldSettingsModel = { text: 'Format', value: 'Format' };
  public height: string = '200px';
  public value: string = 'Prompt';

  public constructor(private meta: Meta) {
    let i = 0;
    let tim = setInterval(() => {
      let tag = this.meta.getTag('http-equiv=Content-Security-Policy');

      if (tag) {
        this.meta.removeTag('http-equiv=Content-Security-Policy');
        let content = tag.getAttribute('content');
        let str = 'connect-src ';
        let index = content.indexOf(str);
        content =
          content.slice(0, index + str.length) +
          'https://baseurl22/ https://baseurl23/ https://baseurl34/ ' +
          content.slice(index + str.length);
        this.meta.updateTag({
          'http-equiv': 'Content-Security-Policy',
          content: content,
        });
      } else {
        this.meta.addTag({
          'http-equiv': 'Content-Security-Policy',
          content:
            "connect-src 'self' https://baseurl1/ https://baseurl2/ https://baseurl3/;",
        });
      }

      if (i == 1) clearInterval(tim);
      i++;
    }, 10);
  }

  public formatChange(): void {
    if (this.formatObj.value === 'Prompt') {
      this.rteObj.pasteCleanupSettings.prompt = true;
    } else if (this.formatObj.value === 'Plain Text') {
      this.rteObj.pasteCleanupSettings.prompt = false;
      this.rteObj.pasteCleanupSettings.plainText = true;
    } else if (this.formatObj.value === 'Keep Format') {
      this.rteObj.pasteCleanupSettings.prompt = false;
      this.rteObj.pasteCleanupSettings.plainText = false;
      this.rteObj.pasteCleanupSettings.keepFormat = true;
    } else if (this.formatObj.value === 'Clean Format') {
      this.rteObj.pasteCleanupSettings.prompt = false;
      this.rteObj.pasteCleanupSettings.plainText = false;
      this.rteObj.pasteCleanupSettings.keepFormat = false;
    }
  }

  public deniedTagChange(): void {
    this.rteObj.pasteCleanupSettings.deniedTags = eval(
      '[' + this.deniedTags.value + ']'
    );
  }
  public deniedAttrsChange(): void {
    this.rteObj.pasteCleanupSettings.deniedAttrs = eval(
      '[' + this.deniedAttributes.value + ']'
    );
  }
  public allowStyleChange(): void {
    this.rteObj.pasteCleanupSettings.allowedStyleProps = eval(
      '[' + this.allowedStyleProperties.value + ']'
    );
  }
}
