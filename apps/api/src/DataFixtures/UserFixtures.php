<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        for ($i = 1; $i <= 4; $i++) {
            $user[$i] = new User();
            $user[$i]->setFirstname($faker->firstName);
            $user[$i]->setLastname($faker->lastName);
            $user[$i]->setRoles(['ROLE_USER']);
            $user[$i]->setEmail($faker->email);
            $user[$i]->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
            $user[$i]->setDistrict(75);
            $user[$i]->setCity('Paris');
            $user[$i]->setDescription('blabla');
            $manager->persist($user[$i]);
        }

        $admin = new User();
        $admin->setFirstname('admin');
        $admin->setLastname('ADMIN');
        $admin->setRoles(['ROLE_USER','ROLE_ADMIN']);
        $admin->setEmail('admin@admin.com');
        $admin->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
        $admin->setDistrict(75);
        $admin->setCity('Paris');
        $admin->setDescription('blabla');
        $manager->persist($admin);





        $manager->flush();
    }
}
