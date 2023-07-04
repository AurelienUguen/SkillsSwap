<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    const BRICO = 'Bricolage';
    const JARDIN = 'Jardinage';
    const MUSIC = 'Musique';
    const ART = 'Art Plastique';
    const INFO = 'Informatique';

    public function load(ObjectManager $manager): void
    {
        $cat1 = new Category();
        $cat1->setTitle('Bricolage');
        $this->addReference(self::BRICO, $cat1);
        $manager->persist($cat1);

        $cat2 = new Category();
        $cat2->setTitle('Jardinage');
        $this->addReference(self::JARDIN, $cat2);
        $manager->persist($cat2);

        $cat3 = new Category();
        $cat3->setTitle('Musique');
        $this->addReference(self::MUSIC, $cat3);
        $manager->persist($cat3);

        $cat4 = new Category();
        $cat4->setTitle('Art Plastique');
        $this->addReference(self::ART, $cat4);
        $manager->persist($cat4);

        $cat5 = new Category();
        $cat5->setTitle('Informatique');
        $this->addReference(self::INFO, $cat5);
        $manager->persist($cat5);

        $manager->flush();
    }
}
