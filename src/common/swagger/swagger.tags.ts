/**
 * Tags Swagger organisés par module pour l'API O'Secours
 * Permet une navigation claire dans la documentation
 */

export const SWAGGER_TAG_DESCRIPTIONS = {
  INFO: {
    name: 'Info',
    description: `
        **Informations du backend et contrôles de santé**
        
        Ce module permet de récupérer les informations système du backend O'Secours :
        - Métadonnées de l'application (nom, version, auteur)
        - Statut de santé et monitoring
        - Informations d'environnement et de performance
        - Temps de fonctionnement et statistiques
      `,
  },
} as const;

/**
 * Ordre d'affichage des tags dans la documentation
 */
export const SWAGGER_TAG_ORDER = [
  'Info',
  'Authentication',
  'Alerts',
  'Interventions',
  'Rescue Services',
  'Citizen',
  'Notifications',
  'Administration',
  'Monitoring',
] as const;
