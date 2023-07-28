<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class UserFixtures extends Fixture
{
    const ADMIN = 'ADMIN';
    const NB_USER = 29;

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 1 ; $i <= self::NB_USER ; $i++) {
            $user[$i] = new User();
            $user[$i]->setFirstname($faker->firstName);
            $user[$i]->setLastname($faker->lastName);
            $user[$i]->setRoles(['ROLE_USER']);
            $user[$i]->setEmail(strtolower($user[$i]->getFirstname().".".$user[$i]->getLastname()."@skillswap.wip"));
            $user[$i]->setPlaintextPassword('Password.0');
            $user[$i]->setDistrict(mt_rand(1,95));
            $user[$i]->setCity($faker->city);
            $user[$i]->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
            $this->setReference("user$i", $user[$i]);
            $manager->persist($user[$i]);
        }

        $admin = new User();
        $admin->setFirstname('admin');
        $admin->setLastname('ADMIN');
        $admin->setRoles(['ROLE_USER','ROLE_ADMIN']);
        $admin->setEmail('admin@admin.com');
        $admin->setPlaintextPassword('Password.0');
        $admin->setDistrict(75);
        $admin->setCity('Paris');
        $admin->setDescription('blabla');
        $this->setReference(self::ADMIN, $admin);
        $manager->persist($admin);

        $manager->flush();
    }
}
