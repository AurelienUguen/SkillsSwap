<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class UserFixtures extends Fixture
{
    const ADMIN = 'ADMIN';
    const AD = 'AD';
    const USER1 = 'USER1';
    const USER2 = 'USER2';
    const USER3 = 'USER3';
    const USER_ARR = [self::USER1, self::USER2, self::USER3];
    // const NB_USER = 9;

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        $admin = new User();
        $admin->setTokken( 0 - 3 );
        $admin->setFirstname('admin');
        $admin->setLastname('ADMIN');
      //$admin->setPhone('01.02.03.04.05');
        $admin->setPhone('+33102030405');
        $admin->setRoles(['ROLE_USER','ROLE_ADMIN']);
        $admin->setEmail('admin@admin.com');
        $admin->setPlaintextPassword('Password.0');
        $admin->setDistrict(75);
        $admin->setCity('Paris');
        $admin->setDescription('Compte Administrateur SkillSwap');
        $this->setReference(self::ADMIN, $admin);
        $manager->persist($admin);

        $ad = new User();
        $ad->setTokken( 12 - 3 );
        $ad->setFirstname('ad');
        $ad->setLastname('AD');
      //$ad->setPhone('01.02.03.04.05');
        $ad->setPhone('+33102030405');
        $ad->setRoles(['ROLE_USER','ROLE_ADMIN']);
        $ad->setEmail('ad@ad.com');
        $ad->setPlaintextPassword('Password.0');
        $ad->setDistrict(75);
        $ad->setCity('Paris');
        $ad->setDescription('Compte Administrateur SkillSwap');
        $this->setReference(self::AD, $ad);
        $manager->persist($ad);

        $admin = new User();
        $admin->setTokken(10000);
        $admin->setFirstname('admin');
        $admin->setLastname('ADMIN');
      //$admin->setPhone('01.02.03.04.05');
        $admin->setPhone('+33102030405');
        $admin->setRoles(['ROLE_USER','ROLE_ADMIN']);
        $admin->setEmail('admin@admin.com');
        $admin->setPlaintextPassword('Password.0');
        $admin->setDistrict(75);
        $admin->setCity('Paris');
        $admin->setDescription('Compte Administrateur SkillSwap');
        $this->setReference(self::ADMIN, $admin);
        $manager->persist($admin);

        $user1 = new User();
        $user1->setTokken(mt_rand(0,30));
        $user1->setFirstname($faker->firstName);
        $user1->setLastname($faker->lastName);
        $user1->setRoles(['ROLE_USER']);
        //$user1->setPhone($faker->unique()->phoneNumber);
        //$user1->setPhone('06.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum());
        $user1->setPhone('+336'.self::randomTelNumE164());
        $user1->setEmail(strtolower(\Transliterator::create('NFD; [:Nonspacing Mark:] Remove; NFC')->transliterate($user1->getFirstname().".".$user1->getLastname()."@skillswap.wip")));
        $user1->setPlaintextPassword('Password.0');
        $user1->setDistrict(mt_rand(1,95));
        $user1->setCity($faker->city);
        $user1->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
        $this->setReference(self::USER1, $user1);
        $manager->persist($user1);

        $user2 = new User();
        $user2->setTokken(mt_rand(0,30));
        $user2->setFirstname($faker->firstName);
        $user2->setLastname($faker->lastName);
        $user2->setRoles(['ROLE_USER']);
        //$user2->setPhone($faker->unique()->phoneNumber);
        //$user2->setPhone('06.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum());
        $user2->setPhone('+336'.self::randomTelNumE164());
        $user2->setEmail(strtolower(\Transliterator::create('NFD; [:Nonspacing Mark:] Remove; NFC')->transliterate($user2->getFirstname().".".$user2->getLastname()."@skillswap.wip")));
        $user2->setPlaintextPassword('Password.0');
        $user2->setDistrict(mt_rand(1,95));
        $user2->setCity($faker->city);
        $user2->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
        $this->setReference(self::USER2, $user2);
        $manager->persist($user2);

        $user3 = new User();
        $user3->setTokken(mt_rand(0,30));
        $user3->setFirstname($faker->firstName);
        $user3->setLastname($faker->lastName);
        $user3->setRoles(['ROLE_USER']);
        //$user3->setPhone($faker->unique()->phoneNumber);
        //$user3->setPhone('06.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum());
        $user3->setPhone('+336'.self::randomTelNumE164());
        $user3->setEmail(strtolower(\Transliterator::create('NFD; [:Nonspacing Mark:] Remove; NFC')->transliterate($user3->getFirstname().".".$user3->getLastname()."@skillswap.wip")));
        $user3->setPlaintextPassword('Password.0');
        $user3->setDistrict(mt_rand(1,95));
        $user3->setCity($faker->city);
        $user3->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
        $this->setReference(self::USER3, $user3);
        $manager->persist($user3);

        /* 
        for ($i = 1 ; $i <= self::NB_USER ; $i++) {
            $user[$i] = new User();
            $user[$i]->setTokken((mt_rand(0,30)) - 3);
            $user[$i]->setFirstname($faker->firstName);
            $user[$i]->setLastname($faker->lastName);
            $user[$i]->setRoles(['ROLE_USER']);
          //$user[$i]->setPhone($faker->unique()->phoneNumber);
          //$user[$i]->setPhone('06.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum().'.'.self::randomTelNum());
            $user[$i]->setPhone('+336'.self::randomTelNumE164());
            $user[$i]->setEmail(strtolower(\Transliterator::create('NFD; [:Nonspacing Mark:] Remove; NFC')->transliterate($user[$i]->getFirstname().".".$user[$i]->getLastname()."@skillswap.wip")));
            $user[$i]->setPlaintextPassword('Password.0');
            $user[$i]->setDistrict(mt_rand(1,95));
            $user[$i]->setCity($faker->city);
            $user[$i]->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
            $this->setReference("user$i", $user[$i]);
            $manager->persist($user[$i]);
        }
        */
        
        $manager->flush();
    }

    public function randomTelNum() {
        $randomNumber = mt_rand(0, 99);
        return str_pad($randomNumber, 2, '0', STR_PAD_LEFT);
    }

    public function randomTelNumE164() {
        $randomNumber = mt_rand(0, 99999999);
        return str_pad($randomNumber, 8, '0', STR_PAD_LEFT);
    }
    
}
