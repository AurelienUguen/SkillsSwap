<?php

namespace App\DataFixtures;

use App\Entity\Sheet;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker;

class SheetFixtures extends Fixture implements DependentFixtureInterface
{
    const NB_SHEET = 100;
    const LANGUAGE = [
        "Français",
        "Anglais",
        "Belge",
        "Chypriote",
        "Koréen",
        "Congolais"
    ];
    const PICS_URL = "https://source.unsplash.com/random/400x400/?";
    const CAT_PICS = [
        /*/////////
        'bricolage',
        'arts plastiques',
        'musique',
        'informatique',
        /*/////////
        "lingerie",
        "heels",
        'poterie',
        'infographie',
        'blender',
        'batterie',
        'saucisse',
        'carton',
        'meat',
        "car",
    ];

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 1 ; $i <= self::NB_SHEET ; $i++) {
            $sheet[$i] = new Sheet();
            $sheet[$i]->setTitle($faker->catchPhrase);
            $sheet[$i]->setUser($this->getReference("user".mt_rand(2,(UserFixtures::NB_USER))));
            $sheet[$i]->setCategory($this->getReference(CategoryFixtures::CAT_REF[mt_rand(0,count(CategoryFixtures::CAT_REF)-1)]));
            $sheet[$i]->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
            $sheet[$i]->setIrl( (bool)mt_rand(0,1) );
            ($sheet[$i]->isIrl()) ? $sheet[$i]->setVisio((bool)mt_rand(0,1)) : $sheet[$i]->setVisio((bool)1);

            ( (bool)mt_rand(0,1) )
                ? $sheet[$i]->setImageURL(self::PICS_URL.(self::CAT_PICS[mt_rand(0,count(self::CAT_PICS)-1)]))
                : $sheet[$i]->setImageURL(null);

            $sheet[$i]->setLanguage([self::LANGUAGE[mt_rand(0,count(self::LANGUAGE)-1)]]);
            $this->addReference("sheet$i", $sheet[$i]);
            $manager->persist($sheet[$i]);
        }

        $manager->flush();

        /*
        $sheet1 = new Sheet();
        $sheet1->setTitle('Cours de bouzouki');
        $sheet1->setUser($this->getReference(UserFixtures::USER1));
        $sheet1->setCategory($this->getReference(CategoryFixtures::CAT_MUSIQUE));
        $sheet1->setDescription("Ceci n'est pas un cours de bouzouki");
        $sheet1->setIrl((bool)mt_rand(0,1));
        $sheet1->setVisio((bool)mt_rand(0,1));
        $sheet1->setLanguage(['Belge', 'Anglais']);
        $this->addReference(self::SHEET1, $sheet1);
        $manager->persist($sheet1);

        $sheet2 = new Sheet();
        $sheet2->setTitle("Cours de queue d'arronde");
        $sheet2->setUser($this->getReference(UserFixtures::USER2));
        $sheet2->setCategory($this->getReference(CategoryFixtures::CAT_BRICOLAGE));
        $sheet2->setDescription("Ceci n'est pas une cheville");
        $sheet2->setIrl((bool)mt_rand(0,1));
        $sheet2->setVisio((bool)mt_rand(0,1));
        $sheet2->setLanguage(['Français']);
        $this->addReference(self::SHEET2, $sheet2);
        $manager->persist($sheet2);

        $sheet3 = new Sheet();
        $sheet3->setTitle('Cours de poterie');
        $sheet3->setUser($this->getReference(UserFixtures::USER3));
        $sheet3->setCategory($this->getReference(CategoryFixtures::CAT_ARTSPLASTIQUES));
        $sheet3->setDescription("Ceci est la méthode argile");
        $sheet3->setIrl((bool)mt_rand(0,1));
        $sheet3->setVisio((bool)mt_rand(0,1));
        $sheet3->setLanguage(['Français', 'Espagnol', 'Italien']);
        $this->addReference(self::SHEET3, $sheet3);
        $manager->persist($sheet3);

        $sheet4 = new Sheet();
        $sheet4->setTitle('Cours de Blender');
        $sheet4->setUser($this->getReference(UserFixtures::USER4));
        $sheet4->setCategory($this->getReference(CategoryFixtures::CAT_INFORMATIQUE));
        $sheet4->setDescription("Comment mixer vos fruits en un tour de main");
        $sheet4->setIrl((bool)mt_rand(0,1));
        $sheet4->setVisio((bool)mt_rand(0,1));
        $sheet4->setLanguage(['Gabonais','Argentin']);
        $this->addReference(self::SHEET4, $sheet4);
        $manager->persist($sheet4);

        $sheet5 = new Sheet();
        $sheet5->setTitle('Cours de batterie');
        $sheet5->setUser($this->getReference(UserFixtures::USER1));
        $sheet5->setCategory($this->getReference(CategoryFixtures::CAT_MUSIQUE));
        $sheet5->setDescription("Deviens un meilleur batteur que Bertrand Cantat !");
        $sheet5->setIrl((bool)mt_rand(0,1));
        $sheet5->setVisio((bool)mt_rand(0,1));
        $sheet5->setLanguage(['Français', 'Anglais', 'Japonais', 'Mandarin', 'Serbe']);
        $this->addReference(self::SHEET5, $sheet5);
        $manager->persist($sheet5);

        $sheet6 = new Sheet();
        $sheet6->setTitle('Apprenez à monter votre placard IKEA');
        $sheet6->setUser($this->getReference(UserFixtures::USER2));
        $sheet6->setCategory($this->getReference(CategoryFixtures::CAT_BRICOLAGE));
        $sheet6->setDescription("Pour arrêter de prendre la porte dans la gueule");
        $sheet6->setIrl((bool)mt_rand(0,1));
        $sheet6->setVisio((bool)mt_rand(0,1));
        $sheet6->setLanguage(['Anglais', 'Chypriote', 'Serbe']);
        $this->addReference(self::SHEET6, $sheet6);
        $manager->persist($sheet6);

        $sheet7 = new Sheet();
        $sheet7->setTitle('La bureautique Office pour les nuls');
        $sheet7->setUser($this->getReference(UserFixtures::USER3));
        $sheet7->setCategory($this->getReference(CategoryFixtures::CAT_INFORMATIQUE));
        $sheet7->setDescription("Je propose plusieurs cours EXCEL adaptés en fonction du niveau, toujours accompagnés d'une documentation théorique pratique et d'exercices créés par mes soins. Cette documentation est spécialement ciblée pour que la courbe d'apprentissage soit en accord avec le niveau de l'étudiant.
        Je travaille également sur des points spécifiques tels que le GUIDE DE SOLUTION de problèmes spécifiques.
        L'amélioration est garantie à 100%.");
        $sheet7->setIrl(1);
        $sheet7->setVisio(0);
        $sheet7->setLanguage(['Anglais']);
        $this->addReference(self::SHEET7, $sheet7);
        $manager->persist($sheet7);

        $sheet8 = new Sheet();
        $sheet8->setTitle('Coproterie');
        $sheet8->setUser($this->getReference(UserFixtures::USER4));
        $sheet8->setCategory($this->getReference(CategoryFixtures::CAT_ARTSPLASTIQUES));
        $sheet8->setDescription("Sculptez vos matière");
        $sheet8->setIrl((bool)mt_rand(0,1));
        $sheet8->setVisio((bool)mt_rand(0,1));
        $sheet8->setLanguage(['Belge','Quebecois','portugais']);
        $this->addReference(self::SHEET8, $sheet8);
        $manager->persist($sheet8);
        */
    }

    public function random(){
        (bool)mt_rand(0,1);
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
            CategoryFixtures::class,
        ];
    }
}