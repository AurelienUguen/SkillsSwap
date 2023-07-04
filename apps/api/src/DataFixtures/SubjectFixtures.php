<?php

namespace App\DataFixtures;

use App\Entity\Subject;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class SubjectFixtures extends Fixture implements DependentFixtureInterface
{
    const PLOMB = 'Plomberie';
    const ELAG = 'Elagage';
    const PIANO = 'Piano';
    const POTE = 'Poterie';
    const INFO = 'Infographie';

    public function load(ObjectManager $manager): void
    {
        $sub1 = new Subject();
        $sub1->setTitle('Plomberie');
        $sub1->setCategory($this->getReference(CategoryFixtures::BRICO));
        $this->addReference(self::PLOMB, $sub1);
        $manager->persist($sub1);

        $sub2 = new Subject();
        $sub2->setTitle('Elagage');
        $sub2->setCategory($this->getReference(CategoryFixtures::JARDIN));
        $this->addReference(self::ELAG, $sub2);
        $manager->persist($sub2);

        $sub3 = new Subject();
        $sub3->setTitle('Piano');
        $sub3->setCategory($this->getReference(CategoryFixtures::MUSIC));
        $this->addReference(self::PIANO, $sub3);
        $manager->persist($sub3);

        $sub4 = new Subject();
        $sub4->setTitle('Poterie');
        $sub4->setCategory($this->getReference(CategoryFixtures::ART));
        $this->addReference(self::POTE, $sub4);
        $manager->persist($sub4);

        $sub5 = new Subject();
        $sub5->setTitle('Infographie');
        $sub5->setCategory($this->getReference(CategoryFixtures::INFO));
        $this->addReference(self::INFO, $sub5);
        $manager->persist($sub5);

        $manager->flush();
    }

    public function getDependencies(){
        return[
            CategoryFixtures::class,
        ];
    }
}
