const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken para manejar la verificación de tokens JWT, que se utiliza para autenticar a los usuarios en las rutas protegidas.

module.exports = (req, res, next) => { // Exporta una función middleware que se ejecutará en las rutas protegidas para verificar la autenticación del usuario.
  const token = req.header('Authorization')?.split(' ')[1]; // Obtiene el token JWT del encabezado de autorización de la solicitud. El token se espera en el formato
  if (!token) return res.status(401).json({ msg: 'Token requerido' }); // Si no se proporciona un token, responde con un error 401 indicando que se requiere un token.

  try { // Intenta verificar el token utilizando la clave secreta definida en las variables de entorno. 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Si el token es válido, decodifica el token 
    req.user = decoded; // Agrega la información del usuario decodificada al objeto de solicitud 
    next(); // Llama a la función next() para pasar el control al siguiente middleware o ruta en la cadena de ejecución.
  } catch { // Si la verificación del token falla responde con un error 401
    res.status(401).json({ msg: 'Token inválido' }); // mensaje de que el token proporcionado no es válido.
  }
};