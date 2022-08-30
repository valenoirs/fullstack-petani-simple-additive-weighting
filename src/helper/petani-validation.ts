import Joi from "joi";

const nama = Joi.string().required();
const idPetani = Joi.string().required();
const kode = Joi.string().required();
const alamat = Joi.string().required();
const subsektor = Joi.string().required();
const id = Joi.string().required();
const idPetaniOld = Joi.string().required();
const namaOld = Joi.string().required();

// Sign in input validation
export const tambahPetaniValidation = Joi.object().keys({
  nama,
  idPetani,
  kode,
  alamat,
  subsektor,
});

export const updatePetaniValidation = Joi.object().keys({
  id,
  nama,
  idPetani,
  idPetaniOld,
  kode,
  alamat,
  subsektor,
});
