<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class UserFixtures extends Fixture
{
    const ADMIN = 'ADMIN';
    /*
    const USER1 = 'USER1';
    const USER2 = 'USER2';
    const USER3 = 'USER3';
    const USER4 = 'USER4';
    const USERARRAY = [
        self::USER1,
        self::USER2,
        self::USER3,
        self::USER4
    ];
    */
    const NB_USER = 50;

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        $admin = new User();
        $admin->setFirstname('admin');
        $admin->setLastname('ADMIN');
        $admin->setRoles(['ROLE_USER','ROLE_ADMIN']);
        $admin->setEmail('admin@admin.com');
        // Password0 //
        //$admin->setPassword('$2y$13$sR7MHj5S1xUQynO2cVmXX.mRYS/pyCzGuq0OxN7uMRwa1QxLnTf5a');
        // Password.0 //
        //$admin->setPassword('$2y$13$OajadnGr2PXfUogiBK7lPugQVIiBgTJYLtRgDIck8vv4aTCs1SAym');
        $admin->setPlaintextPassword('Password.0');
        $admin->setDistrict(75);
        $admin->setCity('Paris');
        $admin->setDescription('blabla');
        $this->addReference(self::ADMIN, $admin);
        $manager->persist($admin);

        for ($i = 1 ; $i <= self::NB_USER ; $i++) {
            $user[$i] = new User();
            $user[$i]->setFirstname($faker->firstName);
            $user[$i]->setLastname($faker->lastName);
            $user[$i]->setRoles(['ROLE_USER']);
            $user[$i]->setEmail($user[$i]->getFirstname().".".$user[$i]->getLastname()."@skillswap.wip");
            //$user[$i]->setPassword('Password.0');
            $user[$i]->setPlaintextPassword('Password.0');
            $user[$i]->setDistrict(mt_rand(1,95));
            $user[$i]->setCity($faker->city);
            $user[$i]->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
            $this->setReference("user$i", $user[$i]);
            $manager->persist($user[$i]);
        }

        $manager->flush();

        /*
        for ($i = 1; $i <= count(self::USERARRAY); $i++) {
            $user[$i] = new User();
            $user[$i]->setFirstname($faker->firstName);
            $user[$i]->setLastname($faker->lastName);
            $user[$i]->setRoles(['ROLE_USER']);
            $user[$i]->setEmail($faker->email);
            //$user[$i]->setPassword('Password.0');
            $user[$i]->setPlaintextPassword('Password.0');
            $user[$i]->setDistrict(75);
            $user[$i]->setCity('Paris');
            $user[$i]->setDescription('Je vous présente ' . $user[$i]->getFirstname() . ', une personne déterminée et passionnée. Dotée d\'une curiosité insatiable et d\'un esprit ouvert, ' . $user[$i]->getFirstname() . ' aime explorer de nouveaux horizons et relever des défis stimulants. Toujours en quête de connaissances, ' . $user[$i]->getFirstname() . ' est un apprenant avide, cherchant à élargir ses compétences et à s\'enrichir personnellement et professionnellement. Sa nature empathique et sa capacité à écouter attentivement font de ' . $user[$i]->getFirstname() . ' un excellent communicateur et un collaborateur précieux dans toute équipe. Qu\'il s\'agisse de résoudre des problèmes complexes ou de s\'engager dans des projets créatifs, ' . $user[$i]->getFirstname() . ' aborde chaque tâche avec engagement et détermination. Toujours prêt à contribuer positivement à son environnement, ' . $user[$i]->getFirstname() . ' est une personne inspirante qui apporte sa passion et son énergie à tout ce qu\'elle entreprend.');
            $this->setReference(self::USERARRAY[$i - 1], $user[$i]);
            $manager->persist($user[$i]);
        }
        /* 

        $user1 = new User();
        $user1->setFirstname($faker->firstName);
        $user1->setLastname($faker->lastName);
        $user1->setRoles(['ROLE_USER']);
        $user1->setEmail($faker->email);
        // Password.0 //
        //$admin->setPassword('$2y$13$OajadnGr2PXfUogiBK7lPugQVIiBgTJYLtRgDIck8vv4aTCs1SAym');
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
        // Password.0 //
        //$admin->setPassword('$2y$13$OajadnGr2PXfUogiBK7lPugQVIiBgTJYLtRgDIck8vv4aTCs1SAym');
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
        // Password.0 //
        //$admin->setPassword('$2y$13$OajadnGr2PXfUogiBK7lPugQVIiBgTJYLtRgDIck8vv4aTCs1SAym');
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
        // Password.0 //
        //$admin->setPassword('$2y$13$OajadnGr2PXfUogiBK7lPugQVIiBgTJYLtRgDIck8vv4aTCs1SAym');
        $user4->setDistrict(75);
        $user4->setCity('Paris');
        $user4->setDescription('blabla');
        $this->addReference(self::USER4, $user4);
        $manager->persist($user4);
 */
        $admin = new User();
        $admin->setFirstname('admin');
        $admin->setLastname('ADMIN');
        $admin->setRoles(['ROLE_USER', 'ROLE_ADMIN']);
        $admin->setEmail('admin@admin.com');
        // Password0 //
        //$admin->setPassword('$2y$13$sR7MHj5S1xUQynO2cVmXX.mRYS/pyCzGuq0OxN7uMRwa1QxLnTf5a');
        // Password.0 //
        //$admin->setPassword('$2y$13$OajadnGr2PXfUogiBK7lPugQVIiBgTJYLtRgDIck8vv4aTCs1SAym');
        $admin->setPlaintextPassword('Password.0');
        $admin->setDistrict(75);
        $admin->setCity('Paris');
        $admin->setDescription('blabla');
        $this->addReference(self::ADMIN, $admin);
        $manager->persist($admin);

        $manager->flush();
    }
}
