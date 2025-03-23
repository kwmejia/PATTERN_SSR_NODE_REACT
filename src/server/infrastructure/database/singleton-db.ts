// Importamos la fuente de datos de TypeORM (ya configurada)
import { DataSource } from "typeorm";
import { AppDataSource } from "@infra/database/data-source";

/**
 * Clase que implementa el patrón Singleton para la base de datos.
 * Asegura que solo haya una única instancia de conexión activa durante la app.
 */
export class DatabaseSingleton {
  // Variable estática que almacenará la instancia única de DataSource
  private static instance: DataSource;

  // Constructor privado para evitar que se instancie esta clase desde fuera
  private constructor() {}

  /**
   * Método estático que retorna la única instancia de DataSource
   * Si no existe, la inicializa.
   */
  public static async getInstance(): Promise<DataSource> {
    // Si no se ha creado aún la instancia, la inicializamos
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = await AppDataSource.initialize();
      console.log("✅ Database initialized (Singleton)");
    }
    // Retornamos la instancia ya inicializada
    return DatabaseSingleton.instance;
  }
}
