<?php

namespace App\DataFixtures;

use App\Entity\Language;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class LanguageFixtures extends Fixture
{
    const FR = 'Français';
    const EN = 'English';
    const DE = 'Deutsch';

    public function load(ObjectManager $manager): void
    {
        $fr = new Language();
        $fr->setName('Français');
        $this->addReference(self::FR, $fr);
        $manager->persist($fr);

        $en = new Language();
        $en->setName('English');
        $this->addReference(self::EN, $en);
        $manager->persist($en);

        $de = new Language();
        $de->setName('Deutsch');
        $this->addReference(self::DE, $de);
        $manager->persist($de);

        $manager->flush();
    }
}
