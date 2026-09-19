import type { ValidatedContactData } from "./validation";
import type { D1DatabaseLike } from "./rateLimit";

export interface ContactRepository {
  insert(data: ValidatedContactData): Promise<{ success: boolean; id: string }>;
}

export class D1ContactRepository implements ContactRepository {
  constructor(private db: D1DatabaseLike) {}

  async insert(data: ValidatedContactData): Promise<{ success: boolean; id: string }> {
    const query = `
      INSERT INTO contact_submissions (
        id,
        created_at,
        name,
        email,
        company,
        service_interest,
        systems,
        problem,
        source_path,
        utm_source,
        utm_medium,
        utm_campaign,
        privacy_notice_version,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db
      .prepare(query)
      .bind(
        data.id,
        data.created_at,
        data.name,
        data.email,
        data.company,
        data.service_interest,
        data.systems,
        data.problem,
        data.source_path,
        data.utm_source,
        data.utm_medium,
        data.utm_campaign,
        data.privacy_notice_version,
        data.status
      )
      .run();

    return { success: true, id: data.id };
  }
}

/**
 * In-memory repository used for test suites and dev without active D1 bindings
 */
export class InMemoryContactRepository implements ContactRepository {
  public submissions: ValidatedContactData[] = [];

  async insert(data: ValidatedContactData): Promise<{ success: boolean; id: string }> {
    this.submissions.push(data);
    return { success: true, id: data.id };
  }
}
