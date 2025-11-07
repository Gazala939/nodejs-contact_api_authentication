import express from 'express'
import { getAllContact, newContact, updateContactById,getContactById, deleteContactById,getContactByUserId } from '../Controllers/contact.js'


const router = express.Router()

router.post('/new', newContact);
router.get('/', getAllContact);
router.put('/:id', updateContactById);
router.delete('/:id', deleteContactById);
router.get('/:id', getContactById);
router.put('/user/:id', getContactByUserId);




export default router;