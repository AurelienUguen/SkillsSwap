<?php

namespace App\DataFixtures;

use App\Entity\Participant;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ParticipantFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $participant1 = new Participant();
        $participant1->setUser($this->getReference(UserFixtures::USER1));
        $participant1->setConversation($this->getReference(ConversationFixtures::CONV1));
        $participant1->setIsNewMsg(1);
        $manager->persist($participant1);
        $manager->flush();
        
        $participant2 = new Participant();
        $participant2->setUser($this->getReference(UserFixtures::USER2));
        $participant2->setConversation($this->getReference(ConversationFixtures::CONV1));
        $participant2->setIsNewMsg(1);
        $manager->persist($participant2);
        $manager->flush();
        
        $participant3 = new Participant();
        $participant3->setUser($this->getReference(UserFixtures::USER1));
        $participant3->setConversation($this->getReference(ConversationFixtures::CONV2));
        $participant3->setIsNewMsg(1);
        $manager->persist($participant3);
        $manager->flush();
        
        $participant4 = new Participant();
        $participant4->setUser($this->getReference(UserFixtures::USER3));
        $participant4->setConversation($this->getReference(ConversationFixtures::CONV2));
        $participant4->setIsNewMsg(1);
        $manager->persist($participant4);
        $manager->flush();
        
        $participant5 = new Participant();
        $participant5->setUser($this->getReference(UserFixtures::USER2));
        $participant5->setConversation($this->getReference(ConversationFixtures::CONV3));
        $participant5->setIsNewMsg(1);
        $manager->persist($participant5);
        $manager->flush();
        
        $participant6 = new Participant();
        $participant6->setUser($this->getReference(UserFixtures::USER3));
        $participant6->setConversation($this->getReference(ConversationFixtures::CONV3));
        $participant6->setIsNewMsg(1);
        $manager->persist($participant6);
        $manager->flush();        

    }

    public function getDependencies()
    {
        return [
            ConversationFixtures::class,
            UserFixtures::class,
        ];
    }
}
