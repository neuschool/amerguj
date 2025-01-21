import { documentToMarkdownString } from '@contentful/rich-text-from-markdown';

export async function convertContentfulToMarkdown(richTextContent: any) {
  try {
    const markdown = await documentToMarkdownString(richTextContent);
    return markdown;
  } catch (error) {
    console.error('Error converting Contentful rich text to markdown:', error);
    return '';
  }
} 