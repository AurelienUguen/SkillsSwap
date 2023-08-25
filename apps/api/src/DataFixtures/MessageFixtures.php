<?php

namespace App\DataFixtures;

use App\Entity\Conversation;
use App\Entity\Message;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class MessageFixtures extends Fixture implements DependentFixtureInterface
{
    const NB_MSG1 = 3;
    
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        for ($i = 1 ; $i <= self::NB_MSG1 ; $i++) {
            $msg[$i] = new Message();
            $msg[$i]->setOwner($this->getReference(UserFixtures::USER_ARR[$i - 1]));
            $msg[$i]->setConversation($this->getReference(ConversationFixtures::CONV_ARR[$i - 1]));
            $msg[$i]->setTitle($faker->sentence(3));
            $msg[$i]->setContent($faker->sentence(6));
            $msg[$i]->setIsRead(0);
            $msg[$i]->setCreatedAt($faker->dateTimeBetween('-1 week', 'now'));
            $manager->persist($msg[$i]);
        }
        $manager->flush();

        for ($i = self::NB_MSG1 ; $i >= 1 ; $i--) {
            $msg[$i] = new Message();
            $msg[$i]->setOwner($this->getReference(UserFixtures::USER_ARR[$i - 1]));
            $msg[$i]->setConversation($this->getReference(ConversationFixtures::CONV_ARR[$i - 1]));
            $msg[$i]->setTitle($faker->sentence(3));
            $msg[$i]->setContent($faker->sentence(6));
            $msg[$i]->setIsRead(0);
            $msg[$i]->setCreatedAt($faker->dateTimeBetween('-1 week', 'now'));
            $manager->persist($msg[$i]);
        }
        $manager->flush();
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
            ConversationFixtures::class,
        ];
    }
}