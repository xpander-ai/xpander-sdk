import dotenv from 'dotenv';
import { XpanderClient } from '../src';
dotenv.config({ path: __dirname + '/.env' });

const xpanderAPIKey = process.env.STG_API_KEY || '';

describe('Test xpander.ai SDK (Knowledge bases management)', () => {
  it('list knowledge bases', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      'http://localhost:8085',
    );

    const kbs = xpanderClient.knowledgeBases.list();

    expect(kbs?.length).toBeGreaterThanOrEqual(1);
  }, 3000000);

  it('create knowledge base', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      'http://localhost:8085',
    );

    // create
    const createdKb = xpanderClient.knowledgeBases.create('test');

    expect(createdKb?.id?.length).toBeGreaterThanOrEqual(10);
  }, 3000000);

  it('knowledge base document management', async () => {
    const xpanderClient = new XpanderClient(
      xpanderAPIKey,
      'http://localhost:8085',
    );

    // list
    const kbs = xpanderClient.knowledgeBases.list();

    expect(kbs?.length).toBeGreaterThanOrEqual(1);

    const kb = kbs[0];

    // create document
    const documentsBefore = kb.listDocuments();
    const createdDocuments = kb.addDocuments(
      ['https://www.princexml.com/samples/invoice-colorful/invoicesample.pdf'],
      true,
    );

    // check document count
    const documentsAfterCreation = kb.listDocuments();
    expect(documentsAfterCreation.length).toBeGreaterThan(
      documentsBefore.length,
    );

    // delete the document
    createdDocuments[0].delete();
    const documentsAfterDeletion = kb.listDocuments();
    expect(documentsAfterDeletion.length).toBeLessThan(
      documentsAfterCreation.length,
    );
  }, 3000000);
});
