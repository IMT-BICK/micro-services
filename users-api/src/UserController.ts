import { Request, Response } from 'express';
import User from './User';

import UserRepository from './UserRepository';

const controller = {

    getUsers: (req: Request, res: Response): Response => {
        return res.json(UserRepository.getAllUsers());
    },

    getUserById: (req: Request, res: Response): Response => {
        const id: string = req.params.id;
        const user: User = UserRepository.getUserById(id);

        if (!user) {
            return res.status(401).json({
                message: 'Utilisateur introuvable'
            });
        }

        return res.json(user);
    },

    postUser: async (req: Request, res: Response): Promise<Response> => {
        const user: User = req.body;

        try {
            await UserRepository.createUser(user);
            return res.status(201);
        } catch (e: any) {
            return res.status(500).json({
                error: true,
                message: e.message
            });
        }
    },

    checkUser: async (req: Request, res: Response): Promise<Response> => {
        const user: User = req.body;

        const verified = await UserRepository.checkPassword(user);

        if (!verified) {
            return res.status(403).json({
                status: 403,
                message: 'Les mots de passe ne correspondent pas'
            });
        }

        return res.status(200).json(verified); 
    }

};

export default controller;