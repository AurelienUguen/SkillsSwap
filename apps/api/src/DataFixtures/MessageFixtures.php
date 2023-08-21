<?php

namespace App\DataFixtures;

use App\Entity\Message;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class MessageFixtures extends Fixture implements DependentFixtureInterface
{
    const NB_MSG = 15;
    
    public function load(ObjectManager $manager): void
    {
        /*
        $faker = Faker\Factory::create('fr_FR');
        for ($i = 1 ; $i <= self::NB_MSG ; $i++) {
            $msg[$i] = new Message();
            $msg[$i]->setOwner($this->getReference("user".mt_rand(2,(UserFixtures::NB_USER))));
            $msg[$i]->setTitle($faker->sentence(3));
            $msg[$i]->setContent($faker->sentence(6));
            $msg[$i]->setIsRead(0);
            $msg[$i]->setCreatedAt($faker->dateTimeBetween('-1 week', 'now'));
            $manager->persist($msg[$i]);
        }
        $manager->flush();
        */
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
        ];
    }
}