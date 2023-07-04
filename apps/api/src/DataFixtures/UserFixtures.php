<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    const ADMIN1 = 'ADMIN1';
    const USER1 = 'USER1';
    const USER2 = 'USER2';
    const USER3 = 'USER3';
    const USER4 = 'USER4';

    public function load(ObjectManager $manager): void
    {
        $admin1 = new User();
        $admin1->setFirstname('admin1');
        $admin1->setLastname('admin1');
        $admin1->setRoles(['ROLE_USER','ROLE_ADMIN']);
        // mdp = user //
        $admin1->setPassword('$2y$13$2EvBSJFtKTeORIz2qBbh2.NWWj.4NiLDg4ElTljXL3q/NcOhz5mQy');
        $admin1->setEmail('admin1.admin1@skillswap.yg');
        $admin1->setPhoneNumber('0102030405');
        $admin1->setDistrict(75);
        $admin1->setCity('Paris');
        $this->addReference(self::ADMIN1, $admin1);

        $manager->persist($admin1);

        $user1 = new User();
        $user1->setFirstname('User1');
        $user1->setLastname('USER1');
        $user1->setRoles(['ROLE_USER']);
        // mdp = user //
        $user1->setPassword('$2y$13$2EvBSJFtKTeORIz2qBbh2.NWWj.4NiLDg4ElTljXL3q/NcOhz5mQy');
        $user1->setEmail('user1.user1@skillswap.yg');
        $user1->setPhoneNumber('0102030405');
        $user1->setDistrict(75);
        $user1->setCity('Paris');
        $this->addReference(self::USER1, $user1);

        $manager->persist($user1);

        $user2 = new User();
        $user2->setFirstname('User2');
        $user2->setLastname('USER2');
        $user2->setRoles(['ROLE_USER']);
        // mdp = user //
        $user2->setPassword('$2y$13$2EvBSJFtKTeORIz2qBbh2.NWWj.4NiLDg4ElTljXL3q/NcOhz5mQy');
        $user2->setEmail('user2.user2@skillswap.yg');
        $user2->setPhoneNumber('0102030405');
        $user2->setDistrict(75);
        $user2->setCity('Paris');
        $this->addReference(self::USER2, $user2);

        $manager->persist($user2);
        
        $user3 = new User();
        $user3->setFirstname('User3');
        $user3->setLastname('USER3');
        $user3->setRoles(['ROLE_USER']);
        // mdp = user //
        $user3->setPassword('$2y$13$2EvBSJFtKTeORIz2qBbh2.NWWj.4NiLDg4ElTljXL3q/NcOhz5mQy');
        $user3->setEmail('user3.user3@skillswap.yg');
        $user3->setPhoneNumber('0102030405');
        $user3->setDistrict(75);
        $user3->setCity('Paris');
        $this->addReference(self::USER3, $user3);

        $manager->persist($user3);
        
        $user4 = new User();
        $user4->setFirstname('User4');
        $user4->setLastname('USER4');
        $user4->setRoles(['ROLE_USER']);
        // mdp = user //
        $user4->setPassword('$2y$13$2EvBSJFtKTeORIz2qBbh2.NWWj.4NiLDg4ElTljXL3q/NcOhz5mQy');
        $user4->setEmail('user4.user4@skillswap.yg');
        $user4->setPhoneNumber('0102030405');
        $user4->setDistrict(75);
        $user4->setCity('Paris');
        $this->addReference(self::USER4, $user4);

        $manager->persist($user4);

        $manager->flush();
    }
}
