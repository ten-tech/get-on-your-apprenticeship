import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Définir le statut HTTP
  res.status(err.status || 500);

  // Envoyer une réponse JSON avec un message d'erreur
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
};

export default errorHandler;
