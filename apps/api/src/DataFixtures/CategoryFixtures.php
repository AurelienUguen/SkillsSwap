<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    const BRICO = 'bricolage';
    const ARTS = 'arts plastiques';
    const MUSIC = 'musique';
    const INFO = 'informatique';

    public function load(ObjectManager $manager): void
    {
        $category1 = new Category();
        $category1->setName('Bricolage');
        $category1->setIsParent(true);
        $this->addReference(self::BRICO, $category1);
        $manager->persist($category1);
        
        $category2 = new Category();
        $category2->setName('Arts Plastiques');
        $category2->setIsParent(true);
        $this->addReference(self::ARTS, $category2);
        $manager->persist($category2);

        $category3 = new Category();
        $category3->setName('Musique');
        $category3->setIsParent(true);
        $this->addReference(self::MUSIC, $category3);
        $manager->persist($category3);

        $category4 = new Category();
        $category4->setName('Informatique');
        $category4->setIsParent(true);
        $this->addReference(self::INFO, $category4);
        $manager->persist($category4);

        $category6 = new Category();
        $category6->setName('Ebénisterie');
        $category6->setParent($category1);
        $category6->setIsParent(false);
        $manager->persist($category6);

        $category7 = new Category();
        $category7->setName('Poterie');
        $category7->setParent($category2);
        $category7->setIsParent(false);
        $manager->persist($category7);

        $category5 = new Category();
        $category5->setName('Bouzouki');
        $category5->setParent($category3);
        $category5->setIsParent(false);
        $manager->persist($category5);
        
        $category8 = new Category();
        $category8->setName('Infographie');
        $category8->setParent($category4);
        $category8->setIsParent(false);
        $manager->persist($category8);

        $category9 = new Category();
        $category9->setName('Blender');
        $category9->setParent($category8);
        $category9->setIsParent(false);
        $manager->persist($category9);

        $manager->flush();
    }

}