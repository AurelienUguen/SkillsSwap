<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class UserFixtures extends Fixture
{
    const ADMIN = 'ADMIN';
    const USER1 = 'USER1';
    const USER2 = 'USER2';
    const USER3 = 'USER3';
    const USER4 = 'USER4';
    const USERARRAY = [self::USER1, self::USER2, self::USER3, self::USER4];

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 1; $i <= count(self::USERARRAY); $i++) {
            $user[$i] = new User();
            $user[$i]->setFirstname($faker->firstName);
            $user[$i]->setLastname($faker->lastName);
            $user[$i]->setRoles(['ROLE_USER']);
            $user[$i]->setEmail($faker->email);
            $user[$i]->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
            $user[$i]->setDistrict(75);
            $user[$i]->setCity('Paris');
            $user[$i]->setDescription('blabla');
            $this->setReference(self::USERARRAY[$i - 1], $user[$i]);
            $manager->persist($user[$i]);
        }
/* 
        $user1 = new User();
        $user1->setFirstname($faker->firstName);
        $user1->setLastname($faker->lastName);
        $user1->setRoles(['ROLE_USER']);
        $user1->setEmail($faker->email);
        $user1->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
        $user1->setDistrict(75);
        $user1->setCity('Paris');
        $user1->setDescription('blabla');
        $this->addReference(self::USER1, $user1);
        $manager->persist($user1);

        $user2 = new User();
        $user2->setFirstname($faker->firstName);
        $user2->setLastname($faker->lastName);
        $user2->setRoles(['ROLE_USER']);
        $user2->setEmail($faker->email);
        $user2->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
        $user2->setDistrict(75);
        $user2->setCity('Paris');
        $user2->setDescription('blabla');
        $this->addReference(self::USER2, $user2);
        $manager->persist($user2);

        $user3 = new User();
        $user3->setFirstname($faker->firstName);
        $user3->setLastname($faker->lastName);
        $user3->setRoles(['ROLE_USER']);
        $user3->setEmail($faker->email);
        $user3->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
        $user3->setDistrict(75);
        $user3->setCity('Paris');
        $user3->setDescription('blabla');
        $this->addReference(self::USER3, $user3);
        $manager->persist($user3);

        $user4 = new User();
        $user4->setFirstname($faker->firstName);
        $user4->setLastname($faker->lastName);
        $user4->setRoles(['ROLE_USER']);
        $user4->setEmail($faker->email);
        $user4->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
        $user4->setDistrict(75);
        $user4->setCity('Paris');
        $user4->setDescription('blabla');
        $this->addReference(self::USER4, $user4);
        $manager->persist($user4);
 */
        $admin = new User();
        $admin->setFirstname('admin');
        $admin->setLastname('ADMIN');
        $admin->setRoles(['ROLE_USER','ROLE_ADMIN']);
        $admin->setEmail('admin@admin.com');
        $admin->setPassword('$2y$13$R7ed2OXzZzruytOE1RDWcuq//pwcAC.tzpQHFZrXjThGqiok9YU8W');
        $admin->setDistrict(75);
        $admin->setCity('Paris');
        $admin->setDescription('blabla');
        $this->addReference(self::ADMIN, $admin);
        $manager->persist($admin);

        $manager->flush();
    }
}
