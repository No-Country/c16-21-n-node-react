import { multer } from 'multer';
import { path } from 'path';

// Función para verificar el tipo de archivo
function checkFileType(file, cb) {
  // Extensiones permitidas
  const fileTypes = /jpeg|jpg|png/;
  // Verificar la extensión del archivo
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Verificar el tipo MIME del archivo
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true); // El archivo es de un tipo permitido
  } else {
    cb(new Error('Error: Images Only !!!')); // Error: solo se permiten imágenes
  }
}

// Configuración de multer para la carga de un solo archivo
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 }, // Límite de tamaño del archivo (1MB)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Filtrar el tipo de archivo
  },
}).single('image');

// Middleware para agregar el ID de usuario al nombre del archivo
function addUserIDToFileName(req, res, next) {
  // Obtener el ID del usuario desde req.user (suponiendo que está disponible)
  const userId = req.user.id; // Suponiendo que el ID del usuario está en req.user

  // Renombrar el archivo con el ID del usuario si está presente
  if (userId) {
    req.file.originalname = userId + '-' + req.file.originalname;
  }

  // Continuar con el siguiente middleware
  next();
}

export { uploadMultiple, upload, addUserIDToFileName };
