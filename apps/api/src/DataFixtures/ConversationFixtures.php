<?php

namespace App\DataFixtures;

use App\Entity\Conversation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ConversationFixtures extends Fixture
{
    const CONV1 = 1;
    const CONV2 = 2;
    const CONV3 = 3;
    const CONV_ARR = [self::CONV1, self::CONV2, self::CONV3];

    public function load(ObjectManager $manager): void
    {
       /*  for ($i = 0; $i <= self::NB_CONV; $i++) {
            $conv[$i] = new Conversation();
            $conv[$i]->setConvId($i);
            $this->setReference("conv$i", $conv[$i]);
            $manager->persist($conv[$i]);
        } */

        $conv1 = new Conversation();
        $conv1->setConvId(1);
        $this->setReference(self::CONV1, $conv1);
        $manager->persist($conv1);

        $conv2 = new Conversation();
        $conv2->setConvId(2);
        $this->setReference(self::CONV2, $conv2);
        $manager->persist($conv2);

        $conv3 = new Conversation();
        $conv3->setConvId(3);
        $this->setReference(self::CONV3, $conv3);
        $manager->persist($conv3);        

        $manager->flush();
    }
}
