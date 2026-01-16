import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Template from '../models/Template.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Default templates for new users
const DEFAULT_TEMPLATES = [
    {
        title: 'Contrat Distribution Mobile DTC',
        description: 'Contrat de distribution des produits et services mobiles prépayés hors points de vente et hors commerçants tiers (Direct-to-Consumer).',
        category: 'Distribution DTC',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">CONTRAT DE DISTRIBUTION</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Des Produits et Services Mobiles Prépayés</h2>
    <p style="font-size: 10pt; color: #666;">Hors Points de Vente et Hors Commerçants Tiers</p>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE LES SOUSSIGNÉS :</strong></p>

  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, société anonyme au capital de xxxx_CAPITAL_ORANGE DH, inscrite au Registre du Commerce de Rabat sous le numéro xxxx_RC_ORANGE, dont le siège social est sis à Rabat, Complexe d'affaires Mahaj Ryad, Hay Ryad, représentée par xxxx_REPRESENTANT_ORANGE, en sa qualité de xxxx_QUALITE_ORANGE, dûment habilité(e) aux fins des présentes,</p>
  <p style="margin-bottom: 20px; text-align: right;"><em>Ci-après désignée « <strong>Orange</strong> »</em></p>

  <p style="margin-bottom: 5px;"><strong>D'UNE PART,</strong></p>

  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_DISTRIBUTEUR</strong>, xxxx_FORME_JURIDIQUE au capital de xxxx_CAPITAL_DISTRIBUTEUR DH, inscrite au Registre du Commerce de xxxx_VILLE_RC sous le numéro xxxx_RC_DISTRIBUTEUR, dont le siège social est sis à xxxx_ADRESSE_SIEGE, représentée par xxxx_REPRESENTANT_DISTRIBUTEUR, en sa qualité de xxxx_QUALITE_REPRESENTANT, dûment habilité(e) aux fins des présentes,</p>
  <p style="margin-bottom: 20px; text-align: right;"><em>Ci-après désignée « <strong>le Distributeur</strong> »</em></p>

  <p style="margin-bottom: 30px;"><strong>D'AUTRE PART,</strong></p>

  <p style="margin-bottom: 20px;">Orange et le Distributeur sont ci-après désignés individuellement ou collectivement la ou les « <strong>Partie(s)</strong> ».</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">PRÉAMBULE</h3>
  <p style="margin-bottom: 15px;">Orange est un opérateur de télécommunications autorisé à exploiter des réseaux publics de télécommunications et à fournir des services de télécommunications au Maroc.</p>
  <p style="margin-bottom: 15px;">Dans ce cadre, Orange souhaite confier au Distributeur, qui accepte, la distribution de ses Produits et Services mobiles prépayés selon les modalités définies dans le présent contrat.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – OBJET</h3>
  <p style="margin-bottom: 15px;">Le présent contrat a pour objet de définir les conditions dans lesquelles le Distributeur assurera la distribution des Produits et Services Orange suivants : xxxx_LISTE_PRODUITS</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – DURÉE</h3>
  <p style="margin-bottom: 15px;">Le présent contrat est conclu pour une durée de xxxx_DUREE_CONTRAT à compter du xxxx_DATE_EFFET.</p>
  <p style="margin-bottom: 15px;">Il sera renouvelable par tacite reconduction pour des périodes successives de xxxx_DUREE_RENOUVELLEMENT, sauf dénonciation par l'une des Parties moyennant un préavis de xxxx_PREAVIS.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – TERRITOIRE</h3>
  <p style="margin-bottom: 15px;">Le Distributeur exercera son activité de distribution sur le territoire suivant : xxxx_TERRITOIRE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – CONDITIONS FINANCIÈRES</h3>
  <p style="margin-bottom: 15px;">La rémunération du Distributeur sera calculée selon les modalités définies à l'Annexe Financière.</p>
  <p style="margin-bottom: 15px;">Commission de base : xxxx_COMMISSION_BASE %</p>
  <p style="margin-bottom: 15px;">Objectifs de vente trimestriels : xxxx_OBJECTIFS_VENTE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – OBLIGATIONS DU DISTRIBUTEUR</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Respecter les prix de vente fixés par Orange</li>
    <li>Maintenir un stock minimum de xxxx_STOCK_MINIMUM</li>
    <li>Atteindre les objectifs commerciaux définis</li>
    <li>Respecter l'image de marque Orange</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 6 – RÉSILIATION</h3>
  <p style="margin-bottom: 15px;">Chaque Partie peut résilier le présent contrat en cas de manquement grave de l'autre Partie à ses obligations, après mise en demeure restée sans effet pendant xxxx_DELAI_MISE_EN_DEMEURE jours.</p>

  <div style="margin-top: 50px; display: flex; justify-content: space-between;">
    <div style="width: 45%;">
      <p><strong>Pour Orange</strong></p>
      <p>Fait à xxxx_LIEU_SIGNATURE</p>
      <p>Le xxxx_DATE_SIGNATURE</p>
      <p style="margin-top: 30px;">Signature : _________________</p>
    </div>
    <div style="width: 45%;">
      <p><strong>Pour le Distributeur</strong></p>
      <p>Fait à xxxx_LIEU_SIGNATURE</p>
      <p>Le xxxx_DATE_SIGNATURE</p>
      <p style="margin-top: 30px;">Signature : _________________</p>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_CAPITAL_ORANGE', 'xxxx_RC_ORANGE', 'xxxx_REPRESENTANT_ORANGE', 'xxxx_QUALITE_ORANGE', 'xxxx_NOM_DISTRIBUTEUR', 'xxxx_FORME_JURIDIQUE', 'xxxx_CAPITAL_DISTRIBUTEUR', 'xxxx_VILLE_RC', 'xxxx_RC_DISTRIBUTEUR', 'xxxx_ADRESSE_SIEGE', 'xxxx_REPRESENTANT_DISTRIBUTEUR', 'xxxx_QUALITE_REPRESENTANT', 'xxxx_LISTE_PRODUITS', 'xxxx_DUREE_CONTRAT', 'xxxx_DATE_EFFET', 'xxxx_DUREE_RENOUVELLEMENT', 'xxxx_PREAVIS', 'xxxx_TERRITOIRE', 'xxxx_COMMISSION_BASE', 'xxxx_OBJECTIFS_VENTE', 'xxxx_STOCK_MINIMUM', 'xxxx_DELAI_MISE_EN_DEMEURE', 'xxxx_LIEU_SIGNATURE', 'xxxx_DATE_SIGNATURE'],
        isPinned: true,
        isDefault: true
    },
    {
        title: 'Contrat Distribution Grand Public',
        description: 'Contrat de distribution des produits et services mobiles prépayés segment grand public.',
        category: 'Distribution GP',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">CONTRAT DE DISTRIBUTION</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Produits et Services Mobiles Prépayés - Segment Grand Public</h2>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE LES SOUSSIGNÉS :</strong></p>

  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, représentée par xxxx_REPRESENTANT_ORANGE, ci-après « <strong>Orange</strong> »</p>
  <p style="margin-bottom: 5px;"><strong>ET</strong></p>
  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_PARTENAIRE</strong>, xxxx_FORME_JURIDIQUE, RC: xxxx_RC_PARTENAIRE, représentée par xxxx_REPRESENTANT_PARTENAIRE, ci-après « <strong>le Partenaire</strong> »</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – OBJET DU CONTRAT</h3>
  <p style="margin-bottom: 15px;">Orange confie au Partenaire la distribution des produits et services mobiles prépayés destinés au segment grand public, comprenant : xxxx_PRODUITS_GP</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – ZONE GÉOGRAPHIQUE</h3>
  <p style="margin-bottom: 15px;">Le Partenaire opérera dans la zone suivante : xxxx_ZONE_GEOGRAPHIQUE</p>
  <p style="margin-bottom: 15px;">Nombre de points de vente autorisés : xxxx_NOMBRE_PDV</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – DURÉE ET RENOUVELLEMENT</h3>
  <p style="margin-bottom: 15px;">Durée initiale : xxxx_DUREE_INITIALE</p>
  <p style="margin-bottom: 15px;">Date d'effet : xxxx_DATE_EFFET</p>
  <p style="margin-bottom: 15px;">Conditions de renouvellement : xxxx_CONDITIONS_RENOUVELLEMENT</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – RÉMUNÉRATION</h3>
  <p style="margin-bottom: 15px;">Commission sur ventes : xxxx_TAUX_COMMISSION %</p>
  <p style="margin-bottom: 15px;">Prime sur objectifs : xxxx_PRIME_OBJECTIFS</p>
  <p style="margin-bottom: 15px;">Modalités de paiement : xxxx_MODALITES_PAIEMENT</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – ENGAGEMENTS DU PARTENAIRE</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Objectif mensuel minimum : xxxx_OBJECTIF_MENSUEL</li>
    <li>Formation des équipes commerciales</li>
    <li>Respect de la charte graphique Orange</li>
    <li>Reporting hebdomadaire des ventes</li>
  </ul>

  <div style="margin-top: 50px;">
    <p>Fait en deux exemplaires originaux à xxxx_LIEU, le xxxx_DATE</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div><strong>Pour Orange</strong><br/><br/>_________________</div>
      <div><strong>Pour le Partenaire</strong><br/><br/>_________________</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_REPRESENTANT_ORANGE', 'xxxx_NOM_PARTENAIRE', 'xxxx_FORME_JURIDIQUE', 'xxxx_RC_PARTENAIRE', 'xxxx_REPRESENTANT_PARTENAIRE', 'xxxx_PRODUITS_GP', 'xxxx_ZONE_GEOGRAPHIQUE', 'xxxx_NOMBRE_PDV', 'xxxx_DUREE_INITIALE', 'xxxx_DATE_EFFET', 'xxxx_CONDITIONS_RENOUVELLEMENT', 'xxxx_TAUX_COMMISSION', 'xxxx_PRIME_OBJECTIFS', 'xxxx_MODALITES_PAIEMENT', 'xxxx_OBJECTIF_MENSUEL', 'xxxx_LIEU', 'xxxx_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Contrat Distribution Fixe (FTTH/ADSL)',
        description: 'Contrat de distribution des produits et services fixes (FTTH, ADSL) en points de vente.',
        category: 'Distribution Fixe',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">CONTRAT DE DISTRIBUTION</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Produits et Services Fixes (FTTH / ADSL)</h2>
    <p style="font-size: 10pt; color: #666;">En Points de Vente</p>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE :</strong></p>
  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, ci-après « <strong>Orange</strong> »</p>
  <p style="margin-bottom: 15px;"><strong>ET</strong></p>
  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_DISTRIBUTEUR</strong>, ci-après « <strong>le Distributeur</strong> »</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – OBJET</h3>
  <p style="margin-bottom: 15px;">Distribution des offres Internet fixe Orange :</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Offres FTTH (Fibre Optique) : xxxx_OFFRES_FTTH</li>
    <li>Offres ADSL : xxxx_OFFRES_ADSL</li>
    <li>Services additionnels : xxxx_SERVICES_ADDITIONNELS</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – TERRITOIRE ET POINTS DE VENTE</h3>
  <p style="margin-bottom: 15px;">Zone de couverture : xxxx_ZONE_COUVERTURE</p>
  <p style="margin-bottom: 15px;">Liste des points de vente agréés : xxxx_LISTE_PDV</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – DURÉE</h3>
  <p style="margin-bottom: 15px;">Période contractuelle : du xxxx_DATE_DEBUT au xxxx_DATE_FIN</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – CONDITIONS COMMERCIALES</h3>
  <p style="margin-bottom: 15px;">Commission par abonnement FTTH : xxxx_COMMISSION_FTTH DH</p>
  <p style="margin-bottom: 15px;">Commission par abonnement ADSL : xxxx_COMMISSION_ADSL DH</p>
  <p style="margin-bottom: 15px;">Bonus qualité installation : xxxx_BONUS_QUALITE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – OBLIGATIONS TECHNIQUES</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Vérification éligibilité client</li>
    <li>Collecte des documents requis</li>
    <li>Transmission des dossiers sous xxxx_DELAI_TRANSMISSION heures</li>
    <li>Suivi post-installation</li>
  </ul>

  <div style="margin-top: 50px;">
    <p>Signatures des Parties</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>Orange</strong><br/>Date: xxxx_DATE<br/><br/>_________________</div>
      <div style="width: 45%;"><strong>Le Distributeur</strong><br/>Date: xxxx_DATE<br/><br/>_________________</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_NOM_DISTRIBUTEUR', 'xxxx_OFFRES_FTTH', 'xxxx_OFFRES_ADSL', 'xxxx_SERVICES_ADDITIONNELS', 'xxxx_ZONE_COUVERTURE', 'xxxx_LISTE_PDV', 'xxxx_DATE_DEBUT', 'xxxx_DATE_FIN', 'xxxx_COMMISSION_FTTH', 'xxxx_COMMISSION_ADSL', 'xxxx_BONUS_QUALITE', 'xxxx_DELAI_TRANSMISSION', 'xxxx_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Contrat de Partenariat',
        description: 'Contrat de partenariat type pour collaboration commerciale et technique.',
        category: 'Partenariat',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">CONTRAT DE PARTENARIAT</h1>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE LES SOUSSIGNÉS :</strong></p>

  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, société anonyme, dont le siège social est à Rabat, représentée par xxxx_REPRESENTANT_ORANGE, ci-après « <strong>Orange</strong> »</p>
  <p style="margin-bottom: 5px;"><strong>D'UNE PART,</strong></p>

  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_PARTENAIRE</strong>, xxxx_FORME_JURIDIQUE au capital de xxxx_CAPITAL DH, RC: xxxx_RC, siège social : xxxx_SIEGE_SOCIAL, représentée par xxxx_REPRESENTANT_PARTENAIRE en qualité de xxxx_QUALITE, ci-après « <strong>le Partenaire</strong> »</p>
  <p style="margin-bottom: 30px;"><strong>D'AUTRE PART,</strong></p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">PRÉAMBULE</h3>
  <p style="margin-bottom: 15px;">xxxx_CONTEXTE_PARTENARIAT</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – OBJET DU PARTENARIAT</h3>
  <p style="margin-bottom: 15px;">Le présent contrat a pour objet de définir les modalités du partenariat entre les Parties pour : xxxx_OBJET_PARTENARIAT</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – ENGAGEMENTS D'ORANGE</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>xxxx_ENGAGEMENT_1_ORANGE</li>
    <li>xxxx_ENGAGEMENT_2_ORANGE</li>
    <li>Support technique et formation</li>
    <li>Accès aux outils et plateformes partenaires</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – ENGAGEMENTS DU PARTENAIRE</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>xxxx_ENGAGEMENT_1_PARTENAIRE</li>
    <li>xxxx_ENGAGEMENT_2_PARTENAIRE</li>
    <li>Respect des normes qualité Orange</li>
    <li>Reporting mensuel d'activité</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – DURÉE</h3>
  <p style="margin-bottom: 15px;">Le présent contrat est conclu pour une durée de xxxx_DUREE à compter du xxxx_DATE_EFFET.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – CONDITIONS FINANCIÈRES</h3>
  <p style="margin-bottom: 15px;">xxxx_CONDITIONS_FINANCIERES</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 6 – CONFIDENTIALITÉ</h3>
  <p style="margin-bottom: 15px;">Les Parties s'engagent à maintenir confidentielles toutes les informations échangées dans le cadre du présent partenariat pendant une durée de xxxx_DUREE_CONFIDENTIALITE ans après son terme.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 7 – RÉSILIATION</h3>
  <p style="margin-bottom: 15px;">Préavis de résiliation : xxxx_PREAVIS_RESILIATION</p>
  <p style="margin-bottom: 15px;">Cas de résiliation immédiate : xxxx_CAS_RESILIATION</p>

  <div style="margin-top: 50px;">
    <p>Fait à xxxx_LIEU, le xxxx_DATE, en deux exemplaires originaux.</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>Pour Orange</strong><br/>xxxx_REPRESENTANT_ORANGE<br/><br/>Signature : _________________</div>
      <div style="width: 45%;"><strong>Pour le Partenaire</strong><br/>xxxx_REPRESENTANT_PARTENAIRE<br/><br/>Signature : _________________</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_REPRESENTANT_ORANGE', 'xxxx_NOM_PARTENAIRE', 'xxxx_FORME_JURIDIQUE', 'xxxx_CAPITAL', 'xxxx_RC', 'xxxx_SIEGE_SOCIAL', 'xxxx_REPRESENTANT_PARTENAIRE', 'xxxx_QUALITE', 'xxxx_CONTEXTE_PARTENARIAT', 'xxxx_OBJET_PARTENARIAT', 'xxxx_ENGAGEMENT_1_ORANGE', 'xxxx_ENGAGEMENT_2_ORANGE', 'xxxx_ENGAGEMENT_1_PARTENAIRE', 'xxxx_ENGAGEMENT_2_PARTENAIRE', 'xxxx_DUREE', 'xxxx_DATE_EFFET', 'xxxx_CONDITIONS_FINANCIERES', 'xxxx_DUREE_CONFIDENTIALITE', 'xxxx_PREAVIS_RESILIATION', 'xxxx_CAS_RESILIATION', 'xxxx_LIEU', 'xxxx_DATE'],
        isPinned: true,
        isDefault: true
    },
    {
        title: 'Contrat GNV (Gaz Naturel Véhicule)',
        description: 'Contrat pour la distribution et commercialisation de services GNV.',
        category: 'GNV',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">CONTRAT GNV</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Services Gaz Naturel Véhicule</h2>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE :</strong></p>
  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, représentée par xxxx_REPRESENTANT_ORANGE, ci-après « <strong>Orange</strong> »</p>
  <p style="margin-bottom: 15px;"><strong>ET</strong></p>
  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_OPERATEUR</strong>, opérateur GNV, RC: xxxx_RC_OPERATEUR, représenté par xxxx_REPRESENTANT_OPERATEUR, ci-après « <strong>l'Opérateur</strong> »</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – OBJET</h3>
  <p style="margin-bottom: 15px;">Mise en place d'une solution de paiement et gestion pour les services GNV : xxxx_DESCRIPTION_SERVICES</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – STATIONS CONCERNÉES</h3>
  <p style="margin-bottom: 15px;">Liste des stations GNV couvertes : xxxx_LISTE_STATIONS</p>
  <p style="margin-bottom: 15px;">Capacité journalière : xxxx_CAPACITE_JOURNALIERE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – SOLUTION TECHNIQUE</h3>
  <p style="margin-bottom: 15px;">xxxx_SOLUTION_TECHNIQUE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – CONDITIONS FINANCIÈRES</h3>
  <p style="margin-bottom: 15px;">Frais de mise en service : xxxx_FRAIS_MISE_EN_SERVICE DH</p>
  <p style="margin-bottom: 15px;">Commission par transaction : xxxx_COMMISSION_TRANSACTION %</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – DURÉE</h3>
  <p style="margin-bottom: 15px;">Durée : xxxx_DUREE_CONTRAT | Effet : xxxx_DATE_EFFET</p>

  <div style="margin-top: 50px;">
    <p>Fait à xxxx_LIEU, le xxxx_DATE</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div><strong>Orange</strong><br/>_________________</div>
      <div><strong>L'Opérateur</strong><br/>_________________</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_REPRESENTANT_ORANGE', 'xxxx_NOM_OPERATEUR', 'xxxx_RC_OPERATEUR', 'xxxx_REPRESENTANT_OPERATEUR', 'xxxx_DESCRIPTION_SERVICES', 'xxxx_LISTE_STATIONS', 'xxxx_CAPACITE_JOURNALIERE', 'xxxx_SOLUTION_TECHNIQUE', 'xxxx_FRAIS_MISE_EN_SERVICE', 'xxxx_COMMISSION_TRANSACTION', 'xxxx_DUREE_CONTRAT', 'xxxx_DATE_EFFET', 'xxxx_LIEU', 'xxxx_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Avenant Assurance Mobile',
        description: 'Avenant au contrat principal pour l\'ajout des services d\'assurance mobile.',
        category: 'Avenant',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">AVENANT N° xxxx_NUMERO_AVENANT</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Au Contrat de Distribution n° xxxx_NUMERO_CONTRAT_PRINCIPAL</h2>
    <p style="font-size: 10pt; color: #666;">Services d'Assurance Mobile</p>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE :</strong></p>
  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, ci-après « <strong>Orange</strong> »</p>
  <p style="margin-bottom: 15px;"><strong>ET</strong></p>
  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_PARTENAIRE</strong>, ci-après « <strong>le Partenaire</strong> »</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">PRÉAMBULE</h3>
  <p style="margin-bottom: 15px;">Le présent avenant vient compléter le contrat principal signé le xxxx_DATE_CONTRAT_PRINCIPAL afin d'intégrer la distribution des services d'assurance mobile.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – OBJET DE L'AVENANT</h3>
  <p style="margin-bottom: 15px;">Extension du périmètre contractuel pour inclure :</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Assurance casse écran</li>
    <li>Assurance vol</li>
    <li>Assurance perte</li>
    <li>Extension de garantie</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – PRODUITS D'ASSURANCE</h3>
  <p style="margin-bottom: 15px;">Formules proposées : xxxx_FORMULES_ASSURANCE</p>
  <p style="margin-bottom: 15px;">Partenaire assureur : xxxx_NOM_ASSUREUR</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – RÉMUNÉRATION COMPLÉMENTAIRE</h3>
  <p style="margin-bottom: 15px;">Commission par souscription assurance : xxxx_COMMISSION_ASSURANCE DH</p>
  <p style="margin-bottom: 15px;">Prime de renouvellement : xxxx_PRIME_RENOUVELLEMENT DH</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – OBLIGATIONS SPÉCIFIQUES</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Information claire du client sur les garanties</li>
    <li>Remise des conditions générales d'assurance</li>
    <li>Collecte du consentement client</li>
    <li>Archivage des documents pendant xxxx_DUREE_ARCHIVAGE ans</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – ENTRÉE EN VIGUEUR</h3>
  <p style="margin-bottom: 15px;">Le présent avenant entre en vigueur le xxxx_DATE_EFFET_AVENANT.</p>
  <p style="margin-bottom: 15px;">Les autres dispositions du contrat principal demeurent inchangées.</p>

  <div style="margin-top: 50px;">
    <p>Fait à xxxx_LIEU, le xxxx_DATE, en deux exemplaires originaux.</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>Pour Orange</strong><br/><br/>Signature : _________________</div>
      <div style="width: 45%;"><strong>Pour le Partenaire</strong><br/><br/>Signature : _________________</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_NUMERO_AVENANT', 'xxxx_NUMERO_CONTRAT_PRINCIPAL', 'xxxx_NOM_PARTENAIRE', 'xxxx_DATE_CONTRAT_PRINCIPAL', 'xxxx_FORMULES_ASSURANCE', 'xxxx_NOM_ASSUREUR', 'xxxx_COMMISSION_ASSURANCE', 'xxxx_PRIME_RENOUVELLEMENT', 'xxxx_DUREE_ARCHIVAGE', 'xxxx_DATE_EFFET_AVENANT', 'xxxx_LIEU', 'xxxx_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Contrat Distribution Recharge',
        description: 'Contrat de distribution des services de recharge téléphonique.',
        category: 'Recharge',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">CONTRAT DE DISTRIBUTION</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Services de Recharge Téléphonique</h2>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE :</strong></p>
  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, ci-après « <strong>Orange</strong> »</p>
  <p style="margin-bottom: 15px;"><strong>ET</strong></p>
  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_DISTRIBUTEUR</strong>, xxxx_FORME_JURIDIQUE, ci-après « <strong>le Distributeur</strong> »</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – PRODUITS DE RECHARGE</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Recharge électronique : xxxx_DENOMINATIONS_RECHARGE</li>
    <li>Cartes à gratter (si applicable) : xxxx_CARTES_GRATTER</li>
    <li>Recharge Internet : xxxx_RECHARGE_INTERNET</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – CANAUX DE DISTRIBUTION</h3>
  <p style="margin-bottom: 15px;">Mode de distribution : xxxx_MODE_DISTRIBUTION</p>
  <p style="margin-bottom: 15px;">Plateforme technique : xxxx_PLATEFORME_TECHNIQUE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – CONDITIONS COMMERCIALES</h3>
  <p style="margin-bottom: 15px;">Remise sur achats : xxxx_REMISE_ACHATS %</p>
  <p style="margin-bottom: 15px;">Crédit initial : xxxx_CREDIT_INITIAL DH</p>
  <p style="margin-bottom: 15px;">Conditions de réapprovisionnement : xxxx_CONDITIONS_REAPPRO</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – OBJECTIFS</h3>
  <p style="margin-bottom: 15px;">Objectif mensuel minimum : xxxx_OBJECTIF_MENSUEL DH</p>
  <p style="margin-bottom: 15px;">Bonus performance : xxxx_BONUS_PERFORMANCE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – DURÉE</h3>
  <p style="margin-bottom: 15px;">Durée : xxxx_DUREE | Date d'effet : xxxx_DATE_EFFET</p>

  <div style="margin-top: 50px;">
    <p>Fait à xxxx_LIEU, le xxxx_DATE</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div><strong>Orange</strong><br/>_________________</div>
      <div><strong>Le Distributeur</strong><br/>_________________</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_NOM_DISTRIBUTEUR', 'xxxx_FORME_JURIDIQUE', 'xxxx_DENOMINATIONS_RECHARGE', 'xxxx_CARTES_GRATTER', 'xxxx_RECHARGE_INTERNET', 'xxxx_MODE_DISTRIBUTION', 'xxxx_PLATEFORME_TECHNIQUE', 'xxxx_REMISE_ACHATS', 'xxxx_CREDIT_INITIAL', 'xxxx_CONDITIONS_REAPPRO', 'xxxx_OBJECTIF_MENSUEL', 'xxxx_BONUS_PERFORMANCE', 'xxxx_DUREE', 'xxxx_DATE_EFFET', 'xxxx_LIEU', 'xxxx_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Contrat Distribution Mobile Postpayé',
        description: 'Contrat de distribution des produits et services mobiles postpayés en points de vente.',
        category: 'Distribution POSTP',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">CONTRAT DE DISTRIBUTION</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Produits et Services Mobiles Postpayés</h2>
    <p style="font-size: 10pt; color: #666;">En Points de Vente</p>
  </div>

  <p style="margin-bottom: 20px;"><strong>ENTRE LES SOUSSIGNÉS :</strong></p>

  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, société anonyme au capital de xxxx_CAPITAL_ORANGE DH, inscrite au Registre du Commerce de Rabat sous le numéro xxxx_RC_ORANGE, dont le siège social est à Rabat, représentée par xxxx_REPRESENTANT_ORANGE, en qualité de xxxx_QUALITE_ORANGE,</p>
  <p style="margin-bottom: 20px; text-align: right;"><em>Ci-après désignée « <strong>Orange</strong> »</em></p>

  <p style="margin-bottom: 5px;"><strong>D'UNE PART,</strong></p>

  <p style="margin-bottom: 15px;"><strong>xxxx_NOM_DISTRIBUTEUR</strong>, xxxx_FORME_JURIDIQUE au capital de xxxx_CAPITAL_DISTRIBUTEUR DH, RC: xxxx_RC_DISTRIBUTEUR à xxxx_VILLE_RC, siège social : xxxx_ADRESSE_SIEGE, représentée par xxxx_REPRESENTANT_DISTRIBUTEUR en qualité de xxxx_QUALITE_REPRESENTANT,</p>
  <p style="margin-bottom: 20px; text-align: right;"><em>Ci-après désignée « <strong>le Distributeur</strong> »</em></p>

  <p style="margin-bottom: 30px;"><strong>D'AUTRE PART,</strong></p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">PRÉAMBULE</h3>
  <p style="margin-bottom: 15px;">Orange commercialise des offres de téléphonie mobile postpayées comprenant des forfaits voix, data et services à valeur ajoutée. Orange souhaite étendre son réseau de distribution via des partenaires agréés.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – OBJET</h3>
  <p style="margin-bottom: 15px;">Le présent contrat a pour objet la distribution des offres mobiles postpayées Orange suivantes :</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Forfaits postpayés : xxxx_FORFAITS_POSTPAYES</li>
    <li>Offres entreprises : xxxx_OFFRES_ENTREPRISES</li>
    <li>Services additionnels : xxxx_SERVICES_ADDITIONNELS</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – POINTS DE VENTE</h3>
  <p style="margin-bottom: 15px;">Liste des points de vente agréés : xxxx_LISTE_PDV</p>
  <p style="margin-bottom: 15px;">Zone géographique : xxxx_ZONE_GEOGRAPHIQUE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – DURÉE</h3>
  <p style="margin-bottom: 15px;">Durée initiale : xxxx_DUREE_CONTRAT à compter du xxxx_DATE_EFFET</p>
  <p style="margin-bottom: 15px;">Renouvellement : tacite reconduction par périodes de xxxx_DUREE_RENOUVELLEMENT</p>
  <p style="margin-bottom: 15px;">Préavis de résiliation : xxxx_PREAVIS</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – CONDITIONS FINANCIÈRES</h3>
  <p style="margin-bottom: 15px;">Commission par nouvel abonnement : xxxx_COMMISSION_ABONNEMENT DH</p>
  <p style="margin-bottom: 15px;">Prime de fidélisation : xxxx_PRIME_FIDELISATION DH</p>
  <p style="margin-bottom: 15px;">Bonus qualité (taux de rétention) : xxxx_BONUS_QUALITE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – OBLIGATIONS DU DISTRIBUTEUR</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Vérification d'identité du client (CIN/Passeport)</li>
    <li>Collecte et transmission des dossiers clients</li>
    <li>Respect des procédures de souscription Orange</li>
    <li>Objectif mensuel minimum : xxxx_OBJECTIF_MENSUEL abonnements</li>
    <li>Taux de résiliation maximum : xxxx_TAUX_RESILIATION_MAX %</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 6 – OBLIGATIONS D'ORANGE</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Formation initiale et continue des équipes</li>
    <li>Fourniture des supports commerciaux</li>
    <li>Accès au système de gestion des abonnements</li>
    <li>Support technique dédié</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 7 – RÉSILIATION</h3>
  <p style="margin-bottom: 15px;">Résiliation pour manquement : mise en demeure de xxxx_DELAI_MISE_EN_DEMEURE jours</p>
  <p style="margin-bottom: 15px;">Résiliation immédiate en cas de : fraude, non-respect des procédures KYC, atteinte à l'image Orange</p>

  <div style="margin-top: 50px;">
    <p>Fait à xxxx_LIEU, le xxxx_DATE, en deux exemplaires originaux.</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>Pour Orange</strong><br/>xxxx_REPRESENTANT_ORANGE<br/><br/>Signature : _________________</div>
      <div style="width: 45%;"><strong>Pour le Distributeur</strong><br/>xxxx_REPRESENTANT_DISTRIBUTEUR<br/><br/>Signature : _________________</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_CAPITAL_ORANGE', 'xxxx_RC_ORANGE', 'xxxx_REPRESENTANT_ORANGE', 'xxxx_QUALITE_ORANGE', 'xxxx_NOM_DISTRIBUTEUR', 'xxxx_FORME_JURIDIQUE', 'xxxx_CAPITAL_DISTRIBUTEUR', 'xxxx_RC_DISTRIBUTEUR', 'xxxx_VILLE_RC', 'xxxx_ADRESSE_SIEGE', 'xxxx_REPRESENTANT_DISTRIBUTEUR', 'xxxx_QUALITE_REPRESENTANT', 'xxxx_FORFAITS_POSTPAYES', 'xxxx_OFFRES_ENTREPRISES', 'xxxx_SERVICES_ADDITIONNELS', 'xxxx_LISTE_PDV', 'xxxx_ZONE_GEOGRAPHIQUE', 'xxxx_DUREE_CONTRAT', 'xxxx_DATE_EFFET', 'xxxx_DUREE_RENOUVELLEMENT', 'xxxx_PREAVIS', 'xxxx_COMMISSION_ABONNEMENT', 'xxxx_PRIME_FIDELISATION', 'xxxx_BONUS_QUALITE', 'xxxx_OBJECTIF_MENSUEL', 'xxxx_TAUX_RESILIATION_MAX', 'xxxx_DELAI_MISE_EN_DEMEURE', 'xxxx_LIEU', 'xxxx_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Master Services Agreement',
        description: 'Accord-cadre de services pour les prestations télécom et IT globales.',
        category: 'Master Agreement',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">MASTER SERVICES AGREEMENT</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Accord-Cadre de Services</h2>
  </div>

  <p style="margin-bottom: 20px;"><strong>BETWEEN:</strong></p>

  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, a company incorporated under the laws of Morocco, with its registered office at Rabat, Complexe d'affaires Mahaj Ryad, represented by xxxx_ORANGE_REPRESENTATIVE, acting as xxxx_ORANGE_TITLE,</p>
  <p style="margin-bottom: 20px; text-align: right;"><em>Hereinafter referred to as "<strong>Orange</strong>" or "<strong>Service Provider</strong>"</em></p>

  <p style="margin-bottom: 5px;"><strong>AND</strong></p>

  <p style="margin-bottom: 15px;"><strong>xxxx_CLIENT_NAME</strong>, a xxxx_CLIENT_LEGAL_FORM incorporated under the laws of xxxx_CLIENT_JURISDICTION, with registered capital of xxxx_CLIENT_CAPITAL, registration number xxxx_CLIENT_REG_NUMBER, with its registered office at xxxx_CLIENT_ADDRESS, represented by xxxx_CLIENT_REPRESENTATIVE, acting as xxxx_CLIENT_TITLE,</p>
  <p style="margin-bottom: 30px; text-align: right;"><em>Hereinafter referred to as "<strong>the Client</strong>"</em></p>

  <p style="margin-bottom: 20px;">Orange and the Client are hereinafter individually or collectively referred to as the "<strong>Party</strong>" or "<strong>Parties</strong>".</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">RECITALS</h3>
  <p style="margin-bottom: 15px;"><strong>WHEREAS</strong> Orange is a leading telecommunications operator providing network connectivity, cloud services, cybersecurity, and digital transformation solutions;</p>
  <p style="margin-bottom: 15px;"><strong>WHEREAS</strong> the Client wishes to engage Orange to provide xxxx_SERVICE_DESCRIPTION;</p>
  <p style="margin-bottom: 15px;"><strong>NOW THEREFORE</strong>, the Parties agree as follows:</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – DEFINITIONS</h3>
  <p style="margin-bottom: 15px;">"<strong>Services</strong>" means the telecommunications and IT services described in the Service Orders.</p>
  <p style="margin-bottom: 15px;">"<strong>Service Order</strong>" means each individual order placed under this Agreement.</p>
  <p style="margin-bottom: 15px;">"<strong>SLA</strong>" means Service Level Agreement as defined in Annex xxxx_SLA_ANNEX.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – SCOPE OF SERVICES</h3>
  <p style="margin-bottom: 15px;">Orange shall provide the following categories of services:</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Network Connectivity: xxxx_NETWORK_SERVICES</li>
    <li>Cloud & Hosting: xxxx_CLOUD_SERVICES</li>
    <li>Security Services: xxxx_SECURITY_SERVICES</li>
    <li>Professional Services: xxxx_PROFESSIONAL_SERVICES</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – TERM AND TERMINATION</h3>
  <p style="margin-bottom: 15px;">Initial Term: xxxx_INITIAL_TERM years from the Effective Date xxxx_EFFECTIVE_DATE</p>
  <p style="margin-bottom: 15px;">Renewal: Automatic renewal for successive periods of xxxx_RENEWAL_PERIOD unless terminated with xxxx_NOTICE_PERIOD months' written notice.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – FEES AND PAYMENT</h3>
  <p style="margin-bottom: 15px;">Annual Contract Value: xxxx_ANNUAL_VALUE xxxx_CURRENCY</p>
  <p style="margin-bottom: 15px;">Payment Terms: xxxx_PAYMENT_TERMS days from invoice date</p>
  <p style="margin-bottom: 15px;">Late Payment Interest: xxxx_LATE_INTEREST % per month</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – SERVICE LEVELS</h3>
  <p style="margin-bottom: 15px;">Availability Target: xxxx_AVAILABILITY_TARGET %</p>
  <p style="margin-bottom: 15px;">Response Time: xxxx_RESPONSE_TIME</p>
  <p style="margin-bottom: 15px;">Resolution Time: xxxx_RESOLUTION_TIME</p>
  <p style="margin-bottom: 15px;">Service Credits: As per SLA Annex</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 6 – CONFIDENTIALITY</h3>
  <p style="margin-bottom: 15px;">Each Party shall maintain the confidentiality of all Confidential Information for a period of xxxx_CONFIDENTIALITY_PERIOD years following termination of this Agreement.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 7 – LIABILITY</h3>
  <p style="margin-bottom: 15px;">Limitation of Liability: xxxx_LIABILITY_CAP xxxx_CURRENCY or xxxx_LIABILITY_PERCENTAGE % of annual fees, whichever is greater.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 8 – GOVERNING LAW</h3>
  <p style="margin-bottom: 15px;">This Agreement shall be governed by the laws of xxxx_GOVERNING_LAW.</p>
  <p style="margin-bottom: 15px;">Dispute Resolution: xxxx_DISPUTE_RESOLUTION</p>

  <div style="margin-top: 50px;">
    <p>IN WITNESS WHEREOF, the Parties have executed this Agreement as of xxxx_SIGNATURE_DATE.</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>For Orange</strong><br/>Name: xxxx_ORANGE_REPRESENTATIVE<br/>Title: xxxx_ORANGE_TITLE<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
      <div style="width: 45%;"><strong>For the Client</strong><br/>Name: xxxx_CLIENT_REPRESENTATIVE<br/>Title: xxxx_CLIENT_TITLE<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_ORANGE_REPRESENTATIVE', 'xxxx_ORANGE_TITLE', 'xxxx_CLIENT_NAME', 'xxxx_CLIENT_LEGAL_FORM', 'xxxx_CLIENT_JURISDICTION', 'xxxx_CLIENT_CAPITAL', 'xxxx_CLIENT_REG_NUMBER', 'xxxx_CLIENT_ADDRESS', 'xxxx_CLIENT_REPRESENTATIVE', 'xxxx_CLIENT_TITLE', 'xxxx_SERVICE_DESCRIPTION', 'xxxx_SLA_ANNEX', 'xxxx_NETWORK_SERVICES', 'xxxx_CLOUD_SERVICES', 'xxxx_SECURITY_SERVICES', 'xxxx_PROFESSIONAL_SERVICES', 'xxxx_INITIAL_TERM', 'xxxx_EFFECTIVE_DATE', 'xxxx_RENEWAL_PERIOD', 'xxxx_NOTICE_PERIOD', 'xxxx_ANNUAL_VALUE', 'xxxx_CURRENCY', 'xxxx_PAYMENT_TERMS', 'xxxx_LATE_INTEREST', 'xxxx_AVAILABILITY_TARGET', 'xxxx_RESPONSE_TIME', 'xxxx_RESOLUTION_TIME', 'xxxx_CONFIDENTIALITY_PERIOD', 'xxxx_LIABILITY_CAP', 'xxxx_LIABILITY_PERCENTAGE', 'xxxx_GOVERNING_LAW', 'xxxx_DISPUTE_RESOLUTION', 'xxxx_SIGNATURE_DATE'],
        isPinned: true,
        isDefault: true
    },
    {
        title: 'Service Order',
        description: 'Bon de commande de services spécifiques dans le cadre d\'un accord-cadre.',
        category: 'Service Order',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">SERVICE ORDER</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Order No. xxxx_ORDER_NUMBER</h2>
    <p style="font-size: 10pt; color: #666;">Under Master Agreement No. xxxx_MSA_REFERENCE</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd; width: 30%;"><strong>Order Date:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_ORDER_DATE</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Client:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_CLIENT_NAME</td>
    </tr>
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Client Contact:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_CLIENT_CONTACT</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Orange Account Manager:</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_ACCOUNT_MANAGER</td>
    </tr>
  </table>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">1. SERVICE DESCRIPTION</h3>
  <p style="margin-bottom: 15px;"><strong>Service Type:</strong> xxxx_SERVICE_TYPE</p>
  <p style="margin-bottom: 15px;"><strong>Service Details:</strong> xxxx_SERVICE_DETAILS</p>
  <p style="margin-bottom: 15px;"><strong>Locations:</strong> xxxx_SERVICE_LOCATIONS</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">2. TECHNICAL SPECIFICATIONS</h3>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Bandwidth/Capacity: xxxx_BANDWIDTH</li>
    <li>Configuration: xxxx_CONFIGURATION</li>
    <li>Equipment: xxxx_EQUIPMENT</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">3. SERVICE TERM</h3>
  <p style="margin-bottom: 15px;">Start Date: xxxx_START_DATE</p>
  <p style="margin-bottom: 15px;">Initial Term: xxxx_SERVICE_TERM</p>
  <p style="margin-bottom: 15px;">Estimated Delivery: xxxx_DELIVERY_DATE</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">4. PRICING</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
    <tr style="background: #FF7900; color: white;">
      <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Item</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Amount</th>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">One-time Setup Fee</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">xxxx_SETUP_FEE xxxx_CURRENCY</td>
    </tr>
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd;">Monthly Recurring Charge</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">xxxx_MONTHLY_FEE xxxx_CURRENCY</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Contract Value</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;"><strong>xxxx_TOTAL_VALUE xxxx_CURRENCY</strong></td>
    </tr>
  </table>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">5. SERVICE LEVELS</h3>
  <p style="margin-bottom: 15px;">Availability SLA: xxxx_AVAILABILITY_SLA</p>
  <p style="margin-bottom: 15px;">Support Level: xxxx_SUPPORT_LEVEL</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">6. SPECIAL CONDITIONS</h3>
  <p style="margin-bottom: 15px;">xxxx_SPECIAL_CONDITIONS</p>

  <div style="margin-top: 50px; background: #f9f9f9; padding: 20px; border-radius: 5px;">
    <p><strong>ACCEPTANCE:</strong> By signing below, the Client accepts this Service Order subject to the terms of the Master Agreement.</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>For Orange</strong><br/>Name: xxxx_ORANGE_SIGNATORY<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
      <div style="width: 45%;"><strong>For the Client</strong><br/>Name: xxxx_CLIENT_SIGNATORY<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_ORDER_NUMBER', 'xxxx_MSA_REFERENCE', 'xxxx_ORDER_DATE', 'xxxx_CLIENT_NAME', 'xxxx_CLIENT_CONTACT', 'xxxx_ACCOUNT_MANAGER', 'xxxx_SERVICE_TYPE', 'xxxx_SERVICE_DETAILS', 'xxxx_SERVICE_LOCATIONS', 'xxxx_BANDWIDTH', 'xxxx_CONFIGURATION', 'xxxx_EQUIPMENT', 'xxxx_START_DATE', 'xxxx_SERVICE_TERM', 'xxxx_DELIVERY_DATE', 'xxxx_SETUP_FEE', 'xxxx_MONTHLY_FEE', 'xxxx_TOTAL_VALUE', 'xxxx_CURRENCY', 'xxxx_AVAILABILITY_SLA', 'xxxx_SUPPORT_LEVEL', 'xxxx_SPECIAL_CONDITIONS', 'xxxx_ORANGE_SIGNATORY', 'xxxx_CLIENT_SIGNATORY', 'xxxx_SIGNATURE_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Memorandum of Understanding (MOU)',
        description: 'Protocole d\'accord pour établir un cadre de coopération entre les parties.',
        category: 'MOU',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">MEMORANDUM OF UNDERSTANDING</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Protocole d'Accord</h2>
  </div>

  <p style="margin-bottom: 20px;"><strong>This Memorandum of Understanding ("MOU")</strong> is entered into as of xxxx_EFFECTIVE_DATE</p>

  <p style="margin-bottom: 20px;"><strong>BETWEEN:</strong></p>

  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, with its principal place of business at Rabat, Morocco, represented by xxxx_ORANGE_REPRESENTATIVE ("Orange")</p>

  <p style="margin-bottom: 5px;"><strong>AND</strong></p>

  <p style="margin-bottom: 30px;"><strong>xxxx_PARTNER_NAME</strong>, a xxxx_PARTNER_TYPE with its principal place of business at xxxx_PARTNER_ADDRESS, represented by xxxx_PARTNER_REPRESENTATIVE ("Partner")</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">RECITALS</h3>
  <p style="margin-bottom: 15px;"><strong>WHEREAS</strong>, Orange is a leading telecommunications and digital services provider;</p>
  <p style="margin-bottom: 15px;"><strong>WHEREAS</strong>, Partner is xxxx_PARTNER_DESCRIPTION;</p>
  <p style="margin-bottom: 15px;"><strong>WHEREAS</strong>, the Parties wish to explore potential collaboration in xxxx_COLLABORATION_AREA;</p>
  <p style="margin-bottom: 15px;"><strong>NOW, THEREFORE</strong>, the Parties agree to the following:</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 1 – PURPOSE</h3>
  <p style="margin-bottom: 15px;">This MOU establishes a framework for cooperation between the Parties to:</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>xxxx_OBJECTIVE_1</li>
    <li>xxxx_OBJECTIVE_2</li>
    <li>xxxx_OBJECTIVE_3</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 2 – SCOPE OF COOPERATION</h3>
  <p style="margin-bottom: 15px;">The Parties intend to collaborate on: xxxx_SCOPE_OF_COOPERATION</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 3 – RESPONSIBILITIES</h3>
  <p style="margin-bottom: 15px;"><strong>Orange shall:</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>xxxx_ORANGE_RESPONSIBILITY_1</li>
    <li>xxxx_ORANGE_RESPONSIBILITY_2</li>
  </ul>
  <p style="margin-bottom: 15px;"><strong>Partner shall:</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>xxxx_PARTNER_RESPONSIBILITY_1</li>
    <li>xxxx_PARTNER_RESPONSIBILITY_2</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 4 – TERM</h3>
  <p style="margin-bottom: 15px;">This MOU shall be effective from xxxx_EFFECTIVE_DATE and shall remain in force for xxxx_MOU_DURATION, unless terminated earlier by either Party with xxxx_NOTICE_PERIOD days' written notice.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 5 – CONFIDENTIALITY</h3>
  <p style="margin-bottom: 15px;">Both Parties agree to keep confidential any proprietary information shared during the course of this cooperation for a period of xxxx_CONFIDENTIALITY_PERIOD years.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 6 – NON-BINDING NATURE</h3>
  <p style="margin-bottom: 15px;">This MOU is a statement of intent and does not create any legally binding obligations except for Articles 5 (Confidentiality) and 7 (Governing Law).</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">ARTICLE 7 – GOVERNING LAW</h3>
  <p style="margin-bottom: 15px;">This MOU shall be governed by the laws of xxxx_GOVERNING_LAW.</p>

  <div style="margin-top: 50px;">
    <p><strong>IN WITNESS WHEREOF</strong>, the Parties have executed this MOU as of the date first written above.</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>For Orange</strong><br/>Name: xxxx_ORANGE_REPRESENTATIVE<br/>Title: xxxx_ORANGE_TITLE<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
      <div style="width: 45%;"><strong>For Partner</strong><br/>Name: xxxx_PARTNER_REPRESENTATIVE<br/>Title: xxxx_PARTNER_TITLE<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_EFFECTIVE_DATE', 'xxxx_ORANGE_REPRESENTATIVE', 'xxxx_PARTNER_NAME', 'xxxx_PARTNER_TYPE', 'xxxx_PARTNER_ADDRESS', 'xxxx_PARTNER_REPRESENTATIVE', 'xxxx_PARTNER_DESCRIPTION', 'xxxx_COLLABORATION_AREA', 'xxxx_OBJECTIVE_1', 'xxxx_OBJECTIVE_2', 'xxxx_OBJECTIVE_3', 'xxxx_SCOPE_OF_COOPERATION', 'xxxx_ORANGE_RESPONSIBILITY_1', 'xxxx_ORANGE_RESPONSIBILITY_2', 'xxxx_PARTNER_RESPONSIBILITY_1', 'xxxx_PARTNER_RESPONSIBILITY_2', 'xxxx_MOU_DURATION', 'xxxx_NOTICE_PERIOD', 'xxxx_CONFIDENTIALITY_PERIOD', 'xxxx_GOVERNING_LAW', 'xxxx_ORANGE_TITLE', 'xxxx_PARTNER_TITLE', 'xxxx_SIGNATURE_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Non-Disclosure Agreement (NDA)',
        description: 'Accord de confidentialité pour la protection des informations sensibles.',
        category: 'NDA',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">NON-DISCLOSURE AGREEMENT</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Accord de Confidentialité</h2>
  </div>

  <p style="margin-bottom: 20px;"><strong>This Non-Disclosure Agreement ("Agreement")</strong> is entered into as of xxxx_EFFECTIVE_DATE</p>

  <p style="margin-bottom: 20px;"><strong>BETWEEN:</strong></p>

  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong>, with its registered office at Rabat, Complexe d'affaires Mahaj Ryad, Hay Ryad ("Disclosing Party" / "Receiving Party")</p>

  <p style="margin-bottom: 5px;"><strong>AND</strong></p>

  <p style="margin-bottom: 30px;"><strong>xxxx_OTHER_PARTY_NAME</strong>, a xxxx_OTHER_PARTY_TYPE, with its registered office at xxxx_OTHER_PARTY_ADDRESS ("Disclosing Party" / "Receiving Party")</p>

  <p style="margin-bottom: 20px;">Each referred to as a "Party" and collectively as the "Parties".</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">1. PURPOSE</h3>
  <p style="margin-bottom: 15px;">The Parties wish to explore xxxx_PURPOSE_OF_DISCLOSURE and in connection therewith, may disclose to each other certain confidential and proprietary information.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">2. DEFINITION OF CONFIDENTIAL INFORMATION</h3>
  <p style="margin-bottom: 15px;">"Confidential Information" means any and all information disclosed by either Party, including but not limited to:</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Technical data, trade secrets, know-how</li>
    <li>Business plans, strategies, customer lists</li>
    <li>Financial information and projections</li>
    <li>Product designs and specifications</li>
    <li>xxxx_ADDITIONAL_CONFIDENTIAL_INFO</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">3. OBLIGATIONS OF RECEIVING PARTY</h3>
  <p style="margin-bottom: 15px;">The Receiving Party agrees to:</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Hold all Confidential Information in strict confidence</li>
    <li>Not disclose Confidential Information to any third party without prior written consent</li>
    <li>Use Confidential Information solely for the Purpose stated above</li>
    <li>Protect Confidential Information with at least the same degree of care as its own confidential information</li>
    <li>Limit access to persons who have a need to know</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">4. EXCLUSIONS</h3>
  <p style="margin-bottom: 15px;">Confidential Information does not include information that:</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Is or becomes publicly available through no fault of the Receiving Party</li>
    <li>Was rightfully in possession of the Receiving Party prior to disclosure</li>
    <li>Is independently developed by the Receiving Party</li>
    <li>Is disclosed pursuant to a court order or legal requirement</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">5. TERM</h3>
  <p style="margin-bottom: 15px;">This Agreement shall remain in effect for xxxx_NDA_TERM years from the Effective Date.</p>
  <p style="margin-bottom: 15px;">The confidentiality obligations shall survive for xxxx_SURVIVAL_PERIOD years after termination or expiration of this Agreement.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">6. RETURN OF INFORMATION</h3>
  <p style="margin-bottom: 15px;">Upon termination or request, the Receiving Party shall promptly return or destroy all Confidential Information within xxxx_RETURN_PERIOD days.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">7. NO LICENSE</h3>
  <p style="margin-bottom: 15px;">Nothing in this Agreement grants any license to any intellectual property rights.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">8. REMEDIES</h3>
  <p style="margin-bottom: 15px;">The Parties acknowledge that breach may cause irreparable harm and that injunctive relief may be sought in addition to other remedies.</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">9. GOVERNING LAW</h3>
  <p style="margin-bottom: 15px;">This Agreement shall be governed by the laws of xxxx_GOVERNING_LAW.</p>
  <p style="margin-bottom: 15px;">Jurisdiction: xxxx_JURISDICTION</p>

  <div style="margin-top: 50px;">
    <p><strong>IN WITNESS WHEREOF</strong>, the Parties have executed this Agreement as of the date first written above.</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>For Orange Maroc S.A.</strong><br/>Name: xxxx_ORANGE_SIGNATORY<br/>Title: xxxx_ORANGE_TITLE<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
      <div style="width: 45%;"><strong>For xxxx_OTHER_PARTY_NAME</strong><br/>Name: xxxx_OTHER_SIGNATORY<br/>Title: xxxx_OTHER_TITLE<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_EFFECTIVE_DATE', 'xxxx_OTHER_PARTY_NAME', 'xxxx_OTHER_PARTY_TYPE', 'xxxx_OTHER_PARTY_ADDRESS', 'xxxx_PURPOSE_OF_DISCLOSURE', 'xxxx_ADDITIONAL_CONFIDENTIAL_INFO', 'xxxx_NDA_TERM', 'xxxx_SURVIVAL_PERIOD', 'xxxx_RETURN_PERIOD', 'xxxx_GOVERNING_LAW', 'xxxx_JURISDICTION', 'xxxx_ORANGE_SIGNATORY', 'xxxx_ORANGE_TITLE', 'xxxx_OTHER_SIGNATORY', 'xxxx_OTHER_TITLE', 'xxxx_SIGNATURE_DATE'],
        isPinned: false,
        isDefault: true
    },
    {
        title: 'Service Level Agreement (SLA)',
        description: 'Accord de niveau de service définissant les engagements de qualité.',
        category: 'SLA',
        content: `
<div style="font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #FF7900; font-size: 16pt; margin-bottom: 10px; text-transform: uppercase;">SERVICE LEVEL AGREEMENT</h1>
    <h2 style="font-size: 12pt; font-weight: normal;">Accord de Niveau de Service</h2>
    <p style="font-size: 10pt; color: #666;">Annex to Contract No. xxxx_CONTRACT_REFERENCE</p>
  </div>

  <p style="margin-bottom: 20px;"><strong>BETWEEN:</strong></p>
  <p style="margin-bottom: 15px;"><strong>Orange Maroc S.A.</strong> ("Service Provider")</p>
  <p style="margin-bottom: 5px;"><strong>AND</strong></p>
  <p style="margin-bottom: 30px;"><strong>xxxx_CLIENT_NAME</strong> ("Client")</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">1. SERVICE DESCRIPTION</h3>
  <p style="margin-bottom: 15px;">This SLA applies to the following services: xxxx_SERVICES_COVERED</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">2. SERVICE AVAILABILITY</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
    <tr style="background: #FF7900; color: white;">
      <th style="padding: 10px; border: 1px solid #ddd;">Service</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Target Availability</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Measurement Period</th>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_SERVICE_1</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_AVAILABILITY_1 %</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Monthly</td>
    </tr>
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_SERVICE_2</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_AVAILABILITY_2 %</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Monthly</td>
    </tr>
  </table>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">3. INCIDENT CLASSIFICATION & RESPONSE</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
    <tr style="background: #FF7900; color: white;">
      <th style="padding: 10px; border: 1px solid #ddd;">Priority</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Response Time</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Resolution Target</th>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background: #ff4444; color: white;"><strong>P1 - Critical</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">Total service outage</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P1_RESPONSE</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P1_RESOLUTION</td>
    </tr>
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd; background: #ff8800; color: white;"><strong>P2 - High</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">Major degradation</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P2_RESPONSE</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P2_RESOLUTION</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background: #ffcc00;"><strong>P3 - Medium</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">Minor impact</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P3_RESPONSE</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P3_RESOLUTION</td>
    </tr>
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd; background: #44aa44; color: white;"><strong>P4 - Low</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">Informational/Request</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P4_RESPONSE</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_P4_RESOLUTION</td>
    </tr>
  </table>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">4. SERVICE CREDITS</h3>
  <p style="margin-bottom: 15px;">In case of failure to meet SLA targets, Client is entitled to service credits:</p>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
    <tr style="background: #FF7900; color: white;">
      <th style="padding: 10px; border: 1px solid #ddd;">Availability Achieved</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Service Credit</th>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_THRESHOLD_1 - xxxx_TARGET %</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_CREDIT_1 % of monthly fee</td>
    </tr>
    <tr style="background: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_THRESHOLD_2 - xxxx_THRESHOLD_1 %</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_CREDIT_2 % of monthly fee</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">Below xxxx_THRESHOLD_2 %</td>
      <td style="padding: 10px; border: 1px solid #ddd;">xxxx_CREDIT_3 % of monthly fee</td>
    </tr>
  </table>
  <p style="margin-bottom: 15px;"><strong>Maximum Service Credits:</strong> xxxx_MAX_CREDITS % of monthly fees per month</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">5. EXCLUSIONS</h3>
  <p style="margin-bottom: 15px;">SLA does not apply during:</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Scheduled maintenance (notified xxxx_MAINTENANCE_NOTICE in advance)</li>
    <li>Force majeure events</li>
    <li>Client-caused incidents</li>
    <li>Third-party failures outside Orange's control</li>
  </ul>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">6. SUPPORT HOURS</h3>
  <p style="margin-bottom: 15px;">Standard Support: xxxx_STANDARD_HOURS</p>
  <p style="margin-bottom: 15px;">24/7 Support: xxxx_247_SUPPORT</p>
  <p style="margin-bottom: 15px;">Support Hotline: xxxx_SUPPORT_HOTLINE</p>
  <p style="margin-bottom: 15px;">Support Email: xxxx_SUPPORT_EMAIL</p>

  <h3 style="color: #FF7900; font-size: 12pt; margin-top: 30px; border-bottom: 2px solid #FF7900; padding-bottom: 5px;">7. REPORTING</h3>
  <p style="margin-bottom: 15px;">Orange shall provide monthly SLA performance reports including:</p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Service availability statistics</li>
    <li>Incident summary and resolution times</li>
    <li>Service credit calculations (if applicable)</li>
  </ul>

  <div style="margin-top: 50px;">
    <p>Effective Date: xxxx_EFFECTIVE_DATE</p>
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
      <div style="width: 45%;"><strong>For Orange</strong><br/>Name: xxxx_ORANGE_SIGNATORY<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
      <div style="width: 45%;"><strong>For the Client</strong><br/>Name: xxxx_CLIENT_SIGNATORY<br/><br/>Signature: _________________<br/>Date: xxxx_SIGNATURE_DATE</div>
    </div>
  </div>
</div>
        `,
        placeholders: ['xxxx_CONTRACT_REFERENCE', 'xxxx_CLIENT_NAME', 'xxxx_SERVICES_COVERED', 'xxxx_SERVICE_1', 'xxxx_AVAILABILITY_1', 'xxxx_SERVICE_2', 'xxxx_AVAILABILITY_2', 'xxxx_P1_RESPONSE', 'xxxx_P1_RESOLUTION', 'xxxx_P2_RESPONSE', 'xxxx_P2_RESOLUTION', 'xxxx_P3_RESPONSE', 'xxxx_P3_RESOLUTION', 'xxxx_P4_RESPONSE', 'xxxx_P4_RESOLUTION', 'xxxx_THRESHOLD_1', 'xxxx_TARGET', 'xxxx_CREDIT_1', 'xxxx_THRESHOLD_2', 'xxxx_CREDIT_2', 'xxxx_CREDIT_3', 'xxxx_MAX_CREDITS', 'xxxx_MAINTENANCE_NOTICE', 'xxxx_STANDARD_HOURS', 'xxxx_247_SUPPORT', 'xxxx_SUPPORT_HOTLINE', 'xxxx_SUPPORT_EMAIL', 'xxxx_EFFECTIVE_DATE', 'xxxx_ORANGE_SIGNATORY', 'xxxx_CLIENT_SIGNATORY', 'xxxx_SIGNATURE_DATE'],
        isPinned: false,
        isDefault: true
    }
];

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, company } = req.body;

        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered.' });
        }

        // Create user
        const user = new User({ email, password, name, company });
        await user.save();

        // Create default templates for new user
        const defaultTemplates = DEFAULT_TEMPLATES.map(t => ({
            ...t,
            userId: user._id
        }));
        await Template.insertMany(defaultTemplates);

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: user.toJSON()
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            token,
            user: user.toJSON()
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
});

// Verify token (for auto-login)
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        res.json({ user: user.toJSON() });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
});

export default router;
