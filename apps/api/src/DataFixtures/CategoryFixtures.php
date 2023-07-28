<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    const CAT_BRICOLAGE = 'bricolage';
    const CAT_ARTSPLASTIQUES = 'arts plastiques';
    const CAT_MUSIQUE = 'musique';
    const CAT_INFORMATIQUE = 'informatique';

    /*
    const CAT_EBENISTERIE = 'ebenisterie';
    const CAT_POTERIE = 'poterie';
    const CAT_BOUZOUKI = 'bouzouki';
    const CAT_INFOGRAPHIE = 'infographie';
    const CAT_BLENDER = 'blenbder';
    const CAT_BATTERIE = 'batterie';
    */

    const CAT_REF = [
        self::CAT_BRICOLAGE,
        self::CAT_ARTSPLASTIQUES,
        self::CAT_MUSIQUE,
        self::CAT_INFORMATIQUE
    ];

    public function load(ObjectManager $manager): void
    {
        $category1 = new Category();
        $category1->setName('Bricolage');
        $category1->setIsParent(true);
        $this->addReference(self::CAT_BRICOLAGE, $category1);
        $manager->persist($category1);
        
        $category2 = new Category();
        $category2->setName('Arts Plastiques');
        $category2->setIsParent(true);
        $this->addReference(self::CAT_ARTSPLASTIQUES, $category2);
        $manager->persist($category2);

        $category3 = new Category();
        $category3->setName('Musique');
        $category3->setIsParent(true);
        $this->addReference(self::CAT_MUSIQUE, $category3);
        $manager->persist($category3);

        $category4 = new Category();
        $category4->setName('Informatique');
        $category4->setIsParent(true);
        $this->addReference(self::CAT_INFORMATIQUE, $category4);
        $manager->persist($category4);

        /*
        $category6 = new Category();
        $category6->setName('Ebénisterie');
        $category6->setParent($category1);
        $category6->setIsParent(false);
        $this->addReference(self::CAT_EBENISTERIE, $category6);
        $manager->persist($category6);

        $category7 = new Category();
        $category7->setName('Poterie');
        $category7->setParent($category2);
        $category7->setIsParent(false);
        $this->addReference(self::CAT_POTERIE, $category7);
        $manager->persist($category7);

        $category5 = new Category();
        $category5->setName('Bouzouki');
        $category5->setParent($category3);
        $category5->setIsParent(false);
        $this->addReference(self::CAT_BOUZOUKI, $category5);
        $manager->persist($category5);
        
        $category8 = new Category();
        $category8->setName('Infographie');
        $category8->setParent($category4);
        $category8->setIsParent(false);
        $this->addReference(self::CAT_INFOGRAPHIE, $category8);
        $manager->persist($category8);

        $category9 = new Category();
        $category9->setName('Blender');
        $category9->setParent($category8);
        $category9->setIsParent(false);
        $this->addReference(self::CAT_BLENDER, $category9);
        $manager->persist($category9);

        $category10 = new Category();
        $category10->setName('Batterie');
        $category10->setParent($category3);
        $category10->setIsParent(false);
        $this->addReference(self::CAT_BATTERIE, $category10);
        $manager->persist($category10);
        */

        $manager->flush();
    }

}