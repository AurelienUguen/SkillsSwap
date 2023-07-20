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
    const SHEET6= 'sheet6';
    const SHEETARRAY = [self::SHEET1, self::SHEET2, self::SHEET3, self::SHEET4, self::SHEET5, self::SHEET6];

    public function load(ObjectManager $manager): void
    {

        $sheet1 = new Sheet();
        $sheet1->setTitle('Cours de bouzouki');
        $sheet1->setUser($this->getReference(UserFixtures::USER1));
        $sheet1->setCategory($this->getReference(CategoryFixtures::CAT_BOUZOUKI));
        $sheet1->setDescription("Ceci n'est pas un cours de bouzouki");
        $sheet1->setIrl(1);
        $sheet1->setVisio(0);
        $sheet1->setLanguage(['Français', 'Anglais']);
        $this->addReference(self::SHEET1, $sheet1);
        $manager->persist($sheet1);

        $sheet2 = new Sheet();
        $sheet2->setTitle("Cours de queue d'arronde");
        $sheet2->setUser($this->getReference(UserFixtures::USER2));
        $sheet2->setCategory($this->getReference(CategoryFixtures::CAT_EBENISTERIE));
        $sheet2->setDescription("Ceci n'est pas une cheville");
        $sheet2->setIrl(1);
        $sheet2->setVisio(0);
        $sheet2->setLanguage(['Français']);
        $this->addReference(self::SHEET2, $sheet2);
        $manager->persist($sheet2);

        $sheet3 = new Sheet();
        $sheet3->setTitle('Cours de poterie');
        $sheet3->setUser($this->getReference(UserFixtures::USER3));
        $sheet3->setCategory($this->getReference(CategoryFixtures::CAT_POTERIE));
        $sheet3->setDescription("Ceci est la méthode argile");
        $sheet3->setIrl(1);
        $sheet3->setVisio(0);
        $sheet3->setLanguage(['Français', 'Espagnol', 'Italien']);
        $this->addReference(self::SHEET3, $sheet3);
        $manager->persist($sheet3);

        $sheet4 = new Sheet();
        $sheet4->setTitle('Cours de Blender');
        $sheet4->setUser($this->getReference(UserFixtures::USER4));
        $sheet4->setCategory($this->getReference(CategoryFixtures::CAT_BLENDER));
        $sheet4->setDescription("Comment mixer vos fruits en un tour de main");
        $sheet4->setIrl(0);
        $sheet4->setVisio(1);
        $sheet4->setLanguage(['Anglais']);
        $this->addReference(self::SHEET4, $sheet4);
        $manager->persist($sheet4);

        $sheet5 = new Sheet();
        $sheet5->setTitle('Cours de batterie');
        $sheet5->setUser($this->getReference(UserFixtures::USER3));
        $sheet5->setCategory($this->getReference(CategoryFixtures::CAT_BATTERIE));
        $sheet5->setDescription("Deviens un meilleur batteur que Bertrand Cantat !");
        $sheet5->setIrl(1);
        $sheet5->setVisio(1);
        $sheet5->setLanguage(['Français', 'Anglais', 'Japonais', 'Mandarin', 'Serbe']);
        $this->addReference(self::SHEET5, $sheet5);
        $manager->persist($sheet5);

        $sheet6 = new Sheet();
        $sheet6->setTitle('Apprenez à monter votre placard IKEA');
        $sheet6->setUser($this->getReference(UserFixtures::USER4));
        $sheet6->setCategory($this->getReference(CategoryFixtures::CAT_EBENISTERIE));
        $sheet6->setDescription("Pour arrêter de prendre la porte dans la gueule");
        $sheet6->setIrl(1);
        $sheet6->setVisio(1);
        $sheet6->setLanguage(['Anglais', 'Chypriote', 'Serbe']);
        $this->addReference(self::SHEET6, $sheet6);
        $manager->persist($sheet6);

        $manager->flush();
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
            CategoryFixtures::class,
        ];
    }
}