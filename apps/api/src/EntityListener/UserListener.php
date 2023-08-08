<?php

namespace App\EntityListener;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

Class UserListener
{
    Private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function prePersist(User $user)
    {
        $this->passwordHashoir($user);
    }

    public function preUpdate(User $user)
    {
        $this->passwordHashoir($user);
    }

    public function passwordHashoir(User $user)
    {
        if($user->getPlaintextPassword() === null || $user->getPlaintextPassword() === 'adminUpdateProfile.911'){
            return;
        } 

        $user->setPassword(
            $this->hasher->hashPassword(
                $user,
                $user->getPlaintextPassword()
            )
        );

        $user->setPlaintextPassword(null);
    }
}