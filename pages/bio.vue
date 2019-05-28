<template>
  <div>
    <h1>{{ t('bio') }}</h1>
    <!-- this.$refs.bioText.innerHTML -->
    <div class="row">
    <div ref="bioText">
      {{lang}}
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      // hack
      this.isMounted = true;
    },
    data: function () {
      return {
        contentEn: "<p>Member of the Chamber of Fine Arts of Greece.</p><p>Born and lives in Athens.</p><p>In her school years she studied with artist Eugenia Markakis and later attended a workshop in design and color with artist Tassos Rigas.</p><p>During her studies at Vakalo School she was taught basic drawing, synthesis, painting, art history, jewellery and sculpture by artist Iro Kanakakis, artist – engraver Roubina Sarelakou, artist Tassos Matzavinos, sculptor Kyriakos Rokos, art history teacher Yiannis Papaioannou and sculptress Zanin Baet.</p><p>She graduated third in 1997 and got a certificate of BA Honours of Arts &amp; Design from University of Derby, England.</p><p>She was selected and participated in the Research Group of Graphic Design of Vakalo School during the academic year 1997-1998.</p><p>In 1999 she painted the scenes of the play “Outry” by Tennessee Wiliams at George’s Armenis New Greek Theatre, inspired by the mockup of the artist – engraver Roubina Sarelakou, in cooperation with her and the artists George Tserionis, Stefanos Rokos, Giuliano Kagli and  Farida El Gazzar.</p><p>In December 2012 she made an art mockup for a mural, inspired by lyrics of Nobel Laureate poet Odysseas Elytis, for the 7th Hihg school of Kallithea, in which she added some elements from the kids mockups and till May 2014, she together with 20 kids from B’ class of high school worked on this mural.</p><p>She has presented her artist work in solo exhibitions and participated in group work as well, in Greece and abroad.</p><p>In publishing she has been involved with illustrations in children’s books and particularly printed materials.</p><p>Since September 2014, she Studies in the Technological Educational Institute of Athens, in the Department of Concervation of Antiquities &amp; Works of Art, with the Art teachers Praxitelis Tzanoulinos – Sculptor &amp; Thrassos Avaritsiotis – Visual Artist.</p><p>She works as a painter, sings in a choir &amp; plays the drums &amp; percussion in a Brazilian Band of Batucada.</p>",
        contentGr: "<p>Mέλος του Επιμελητηρίου Εικαστικών Τεχνών Ελλάδας.</p><p>Γεννήθηκε και ζει στην Αθήνα.</p><p>Στα σχολικά της χρόνια µαθήτευσε κοντά στη ζωγράφο Ευγενία Μαρκάκη και αργότερα παρακολούθησε µαθήµατα σχεδίου και χρώµατος στο εργαστήρι του Τάσου Ρήγα.</p><p>Κατά τη διάρκεια των σπουδών της στη σχολή Βακαλό, διδάχθηκε βασικό σχέδιο, σύνθεση, ζωγραφική, ιστορία τέχνης, κόσµηµα και γλυπτική από τους ζωγράφους Ηρώ Κανακάκη, Ρουµπίνα Σαρελάκου, Τάσο Ματζαβίνο, το γλύπτη Κυριάκο Ρόκο, τον ιστορικό τέχνης Γιάννη Παπαϊωάννου και τη γλύπτρια και σχεδιάστρια κοσμημάτων Ζανίν Μπάετ. Αποφοίτησε το 1997, κατέχοντας µία από τις πρώτες θέσεις σε σειρά επιτυχίας και πήρε πιστοποιητικό B.A. Honours of Arts &amp; Design από το πανεπιστήµιο Derby της Αγγλίας.</p><p>Επιλέχθηκε και συµµετείχε στην Ερευνητική Οµάδα Γραφιστικών Εφαρµογών της σχολής Βακαλό κατά το ακαδηµαϊκό έτος 1997-1998.</p><p>To 1999 ζωγράφισε τα σκηνικά της παράστασης “Κραυγή” του Tennessee Wiliams στο Νέο Ελληνικό Θέατρο  του Γιώργου Αρµένη, µε βάση τη µακέτα της ζωγράφου – χαράκτριας Ρουµπίνας Σαρελάκου, σε συνεργασία µε την ίδια και τους ζωγράφους Γιώργο Τσεριώνη, Στέφανο Ρόκο, Τζουλιάνο Καγκλή και τη Farida El Gazzar.</p><p>Το Δεκέμβριο του 2012 έκανε μια ζωγραφική μακέτα, εμπνευσμένη από στίχους του νομπελίστα ποιητή Οδυσσέα Ελύτη, για μια τοιχογραφία στο 7ο Λύκειο της Καλλιθέας, στην οποία προστέθηκαν κομμάτια από προσχέδια που έκαναν οι μαθητές που δίδαξε και από τότε μέχρι το Μάιο του 2014, μαζί με τα 20 παιδιά από τη Β ‘τάξη του λυκείου εργάσθηκαν σε αυτή τοιχογραφία.</p><p>Έχει παρουσιάσει το εικαστικό της έργο της σε ατοµικές και οµαδικές Εκθέσεις στην Ελλάδα και το εξωτερικό.</p><p>Στον τοµέα των εκδόσεων έχει ασχοληθεί  µε την εικονογράφηση παιδικών, κυρίως, εντύπων.</p><p>Απο το Σεπτέμβριο του 2014, σπουδάζει στο ΤΕΙ Συντήρησης Αρχαιοτήτων &amp; Έργων Τέχνης, με καθηγητές, τον Πραξιτέλη Τζανουλίνο στο μάθημα της Πλαστικής, τον Θράσο Αβαριτσιώτη στο μάθημα του Ελευθέρου Σχεδίου και χρώματος και άλλους.</p><p> Aσχολείται µε τη ζωγραφική, με κατασκευές και τη μουσική.</p>",
        isMounted: false
      }
    },
    computed: {
      lang: function () {
        // ATTENTION this tricks Vue to run our code after the component is mounted
        // https://stackoverflow.com/questions/43531755/using-refs-in-a-computed-property
        if (!this.isMounted) {
          // if this component isn't mounted dont run this function
          // because if you do we will get undefined errors
          return;
        }
        if (this.$store.state.lang == "en") {
          this.renderHTML(this.contentEn);
        } else {
          this.renderHTML(this.contentGr);
        }
      }
    },
    methods: {
      renderHTML(s) {
        this.$refs.bioText.innerHTML = s;
      }
    }
  }

</script>
