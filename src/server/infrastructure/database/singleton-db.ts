import { DataSource } from "typeorm";
import { AppDataSource } from "@infra/database/data-source";

/**
 * Singleton wrapper around the TypeORM `DataSource` instance.
 *
 * Ensures that only one database connection is established and reused
 * throughout the entire application lifecycle.
 *
 * This prevents multiple database connections and allows consistent
 * access to the same connection across all modules.
 */
export class DatabaseSingleton {
  /**
   * Holds the single instance of the database connection.
   */
  private static instance: DataSource;

  /**
   * Private constructor to prevent direct instantiation.
   */
  private constructor() {}

  /**
   * Provides access to the single database connection instance.
   * Initializes it lazily on the first call.
   *
   * @returns {Promise<DataSource>} - The initialized TypeORM data source.
   */
  public static async getInstance(): Promise<DataSource> {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = await AppDataSource.initialize();
      console.log("✅ Database initialized (Singleton)");
    }
    // Retornamos la instancia ya inicializada
    return DatabaseSingleton.instance;
  }
}
