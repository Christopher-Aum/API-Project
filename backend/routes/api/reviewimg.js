const express = require('express');

const { requireAuth, toAuthorize } = require('../../utils/auth');
const { ifExists } = require('../../utils/validation');
const { ReviewImage } = require('../../db/models');

const router = express.Router();

router.delete('/:reviewImgId', [requireAuth, toAuthorize, ifExists], async (req, res) => {
    const { reviewImgId } = req.params;
    const reviewImage = await ReviewImage.findByPk(reviewImgId);

    await reviewImage.destroy();

    res.json({ message: "Successfully deleted"});
})

module.exports = router;
