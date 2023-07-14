<?php

namespace App\DataFixtures;

use App\Entity\Sheet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class SheetFixtures extends Fixture implements DependentFixtureInterface
{
    
    const SHEET1 = 'sheet1';
    const SHEET2 = 'sheet2';
    const SHEET3 = 'sheet3';
    const SHEET4 = 'sheet4';
    const SHEET5 = 'sheet5';
    const SHEETARRAY = [self::SHEET1, self::SHEET2, self::SHEET3, self::SHEET4, self::SHEET5];

    public function load(ObjectManager $manager): void
    {

        $sheet1 = new Sheet();
        $sheet1->setTitle('Cours de bouzouki');
        $sheet1->setUser($this->getReference(UserFixtures::USER1));
        $sheet1->setCategory($this->getReference(CategoryFixtures::MUSIC));
        $sheet1->setDescription("Ceci n'est pas un cours de bouzouki");
        $sheet1->setIrl(1);
        $sheet1->setVisio(0);
        $sheet1->getLanguage($this->getReference(LanguageFixtures::DE));
        $this->addReference(self::SHEET1, $sheet1);
        $manager->persist($sheet1);

        $sheet2 = new Sheet();
        $sheet2->setTitle("Cours de queue d'arronde");
        $sheet2->setUser($this->getReference(UserFixtures::USER2));
        $sheet2->setCategory($this->getReference(CategoryFixtures::BRICO));
        $sheet2->setDescription("Ceci n'est pas une cheville");
        $sheet2->setIrl(1);
        $sheet2->setVisio(0);
        $sheet2->getLanguage($this->getReference(LanguageFixtures::FR));
        $sheet2->getLanguage($this->getReference(LanguageFixtures::EN));
        $this->addReference(self::SHEET2, $sheet2);
        $manager->persist($sheet2);

        $sheet3 = new Sheet();
        $sheet3->setTitle('Cours de poterie');
        $sheet3->setUser($this->getReference(UserFixtures::USER3));
        $sheet3->setCategory($this->getReference(CategoryFixtures::ARTS));
        $sheet3->setDescription("Ceci est la méthode argile");
        $sheet3->setIrl(1);
        $sheet3->setVisio(0);
        $sheet3->getLanguage($this->getReference(LanguageFixtures::EN));
        $this->addReference(self::SHEET3, $sheet3);
        $manager->persist($sheet3);

        $sheet4 = new Sheet();
        $sheet4->setTitle('Cours de Blender');
        $sheet4->setUser($this->getReference(UserFixtures::USER4));
        $sheet4->setCategory($this->getReference(CategoryFixtures::INFO));
        $sheet4->setDescription("Comment mixer vos fruits en un tour de main");
        $sheet4->setIrl(0);
        $sheet4->setVisio(1);
        $sheet4->getLanguage($this->getReference(LanguageFixtures::FR));
        $sheet4->getLanguage($this->getReference(LanguageFixtures::DE));
        $this->addReference(self::SHEET4, $sheet4);
        $manager->persist($sheet4);

        $sheet5 = new Sheet();
        $sheet5->setTitle('Cours de bouzouki');
        $sheet5->setUser($this->getReference(UserFixtures::USER2));
        $sheet5->setCategory($this->getReference(CategoryFixtures::MUSIC));
        $sheet5->setDescription("Ceci est un test de buzuki");
        $sheet5->setIrl(1);
        $sheet5->setVisio(1);
        $sheet5->getLanguage($this->getReference(LanguageFixtures::DE));
        $this->addReference(self::SHEET5, $sheet5);
        $manager->persist($sheet5);

        $manager->flush();
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
            CategoryFixtures::class,
            LanguageFixtures::class,
        ];
    }
}