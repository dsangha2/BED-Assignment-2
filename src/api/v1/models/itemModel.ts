/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the item
 *         name:
 *           type: string
 *           description: Name of the item
 *         description:
 *           type: string
 *           description: Description of the item
 *         price:
 *           type: number
 *           description: Price of the item (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the item was last updated
 *       required:
 *         - id
 *         - name
 *         - description
 */
export type Item = {
    id: string;
    name: string;
    description: string;
    price?: number;
    createdAt: Date;
    updatedAt: Date;
};