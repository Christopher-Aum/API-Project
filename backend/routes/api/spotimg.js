const express = require('express');

const { requireAuth, toAuthorize } = require('../../utils/auth');
const { ifExists } = require('../../utils/validation');
const { SpotImage } = require('../../db/models');

const router = express.Router();

router.delete('/:spotImgId', [requireAuth, toAuthorize, ifExists], async (req, res) => {
    const { spotImgId } = req.params;
    const spotImage = await SpotImage.findByPk(spotImgId);

    await spotImage.destroy();

    res.json({ message: 'Successfully deleted'})
})

module.exports = router;
